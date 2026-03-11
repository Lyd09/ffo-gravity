
'use client';

import { ArrowLeft, Bot, Calendar as CalendarIcon, Loader2, TestTube2 } from 'lucide-react';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { useState, useEffect } from 'react';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { summarizeAndStructureInquiry } from '@/ai/flows/summarize-flow';

// Schema for the structured output we want from the AI, defined in the frontend
const StructuredInquiryOutputSchema = z.object({
    clientName: z.string().describe("The client's full name."),
    primaryService: z.string().describe("The main service the client is interested in, translated to Portuguese."),
    projectType: z.string().describe("The type of project, translated to Portuguese."),
    quantity: z.number().describe("The quantity of items for the project."),
    hasDrone: z.boolean().optional().describe("If the client requested drone footage."),
    recordingDate: z.string().optional().describe("The preferred recording date, if provided."),
    recordingLocation: z.string().optional().describe("The preferred recording location, if provided."),
    isEvent: z.boolean().describe("If the project is for an event."),
    eventDetails: z.string().optional().describe("A summary of the event details, if provided."),
    aiSummary: z.array(z.string()).describe("A bullet-point-style list summarizing the most important details inferred ONLY from the 'projectDetails' text. This should capture the client's needs and ideas in their own words."),
});
type StructuredInquiryOutput = z.infer<typeof StructuredInquiryOutputSchema>;


const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  phone: z.string().min(10, {
    message: "Por favor, insira um telefone válido com DDD.",
  }),
  serviceType: z.enum(["gravacao", "producao", "edicao", "drone", "software", "site", "outro"], {
    required_error: "Você precisa selecionar um tipo de serviço.",
  }),
  droneOption: z.boolean().default(false).optional(),
  projectType: z.enum(["reels", "youtube", "institucional", "casamento", "outro"], {
    required_error: "Você precisa selecionar um tipo de projeto.",
  }),
  quantity: z.coerce.number().min(1, {
    message: "A quantidade deve ser de pelo menos 1.",
  }),
  recordingDate: z.date().optional(),
  recordingLocation: z.string().optional(),
  isEvent: z.boolean().default(false),
  eventDescription: z.string().optional(),
  projectDetails: z.string().min(10, {
    message: "Descreva seu projeto com pelo menos 10 caracteres.",
  }).max(2000, {
    message: "A descrição não pode exceder 2000 caracteres.",
  }),
  references: z.string().optional(),
}).refine(data => {
    if ((data.serviceType === 'gravacao' || data.serviceType === 'producao') && !data.recordingDate) {
        return false;
    }
    return true;
    }, {
    message: "A data da gravação é obrigatória para este serviço.",
    path: ["recordingDate"],
}).refine(data => {
    if ((data.serviceType === 'gravacao' || data.serviceType === 'producao') && !data.recordingLocation) {
        return false;
    }
    return true;
    }, {
    message: "O local da gravação é obrigatório para este serviço.",
    path: ["recordingLocation"],
}).refine(data => {
    if (data.isEvent && (!data.eventDescription || data.eventDescription.length < 10)) {
        return false;
    }
    return true;
    }, {
    message: "Por favor, descreva o evento com mais detalhes.",
    path: ["eventDescription"],
});


const serviceOptions = {
    "gravacao": { title: "Gravação", description: "Foco na captação de imagem e som de alta qualidade." },
    "producao": { title: "Produção de Vídeo", description: "Serviço completo, do roteiro à edição final. Pode incluir drone." },
    "edicao": { title: "Edição", description: "Pós-produção de um material que você já gravou." },
    "drone": { title: "Vídeos de Drone", description: "Contratação apenas para captação de imagens aéreas." },
    "software": { title: "Desenvolvimento de Software", description: "Criação de soluções de software personalizadas." },
    "site": { title: "Criação de Site", description: "Desenvolvimento de sites e landing pages." },
    "outro": { title: "Outro", description: "Se sua necessidade é diferente, descreva no campo de projeto." },
};

const ServiceSelectItem = ({ value, title, description }: { value: string, title: string, description: string }) => (
    <SelectItem value={value} className="focus:bg-accent">
      <div className="flex flex-col">
        <span className="font-semibold">{title}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
    </SelectItem>
);

export default function ContatoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      quantity: 1,
      projectDetails: "",
      references: "",
      isEvent: false,
      droneOption: false,
      eventDescription: "",
      recordingLocation: "",
    },
  })

  const serviceType = form.watch("serviceType");
  const isEvent = form.watch("isEvent");

  const showRecordingFields = serviceType === 'gravacao' || serviceType === 'producao';
  const showDroneOption = serviceType === 'producao';
  const showEventSwitch = serviceType !== 'site' && serviceType !== 'software';

  function handleFillWithExample() {
    form.reset({
      name: "João da Silva (Exemplo)",
      email: "joao.silva.exemplo@email.com",
      phone: "31912345678",
      serviceType: "producao",
      projectType: "institucional",
      quantity: 3,
      recordingDate: new Date(),
      recordingLocation: "Belo Horizonte, MG",
      isEvent: false,
      droneOption: true,
      projectDetails: "Gostaria de criar 3 vídeos institucionais para minha empresa. O objetivo é mostrar a cultura da empresa, o dia a dia da equipe e apresentar nosso novo produto. Busco uma estética moderna e profissional, com takes cinematográficos.",
      references: "https://www.youtube.com/watch?v=exemplo1\nhttps://vimeo.com/exemplo2",
    });
    toast.info("Formulário preenchido com dados de exemplo.", {
      description: "Agora você pode enviar para ver como funciona!",
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const toastId = toast.loading("Analisando sua solicitação...", {
        description: "Nossa IA está preparando um resumo para agilizar seu atendimento.",
    });

    try {
        const aiInput = {
          ...values,
          recordingDate: values.recordingDate ? format(values.recordingDate, "dd/MM/yyyy") : undefined,
        };

        const structuredData: StructuredInquiryOutput = await summarizeAndStructureInquiry(aiInput);

        if (!structuredData || !structuredData.primaryService) {
            toast.error("A IA não conseguiu processar sua solicitação.", {
                id: toastId,
                description: "Por favor, verifique os dados e tente novamente ou contate o suporte.",
            });
            setIsLoading(false);
            return;
        }

        const messageParts = [
            `Olá, equipe da FastFilms! 👋`,
            `Meu nome é *${structuredData.clientName}* e estou entrando em contato através do site para solicitar um orçamento.`,
            ``,
            `*Resumo da minha solicitação:*`,
            `- *Serviço de Interesse:* ${structuredData.primaryService}`,
            `- *Tipo de Projeto:* ${structuredData.projectType}`,
            `- *Quantidade:* ${structuredData.quantity}`,
        ];

        if (structuredData.hasDrone) {
            messageParts.push(`- *Adicional:* Incluir filmagem com Drone`);
        }
        if (structuredData.recordingDate) {
            messageParts.push(`- *Data Sugerida:* ${structuredData.recordingDate}`);
        }
        if (structuredData.recordingLocation) {
            messageParts.push(`- *Local Sugerido:* ${structuredData.recordingLocation}`);
        }
        if (structuredData.isEvent && structuredData.eventDetails) {
            messageParts.push(`- *Detalhes do Evento:* ${structuredData.eventDetails}`);
        }
        if (values.references) {
            messageParts.push(`- *Referências:* ${values.references}`);
        }

        if (structuredData.aiSummary && structuredData.aiSummary.length > 0) {
            messageParts.push(``);
            messageParts.push(`*Observações que a IA extraiu da minha descrição:*`);
            structuredData.aiSummary.forEach(detail => {
                messageParts.push(`- ${detail}`);
            });
        }
        
        messageParts.push(``);
        messageParts.push(`Fico no aguardo do contato de vocês para conversarmos mais sobre o projeto. Obrigado!`);


        const finalMessage = messageParts.join('\n');
        const whatsappUrl = `https://wa.me/553172208560?text=${encodeURIComponent(finalMessage)}`;
        
        toast.success("Resumo gerado com sucesso!", {
            id: toastId,
            description: "Você será redirecionado para o WhatsApp para iniciar a conversa.",
        });

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 2000);

    } catch (error) {
        console.error("Erro ao gerar resumo com IA:", error);
        toast.error("Erro ao contatar a IA", {
            id: toastId,
            description: "Houve um problema ao processar sua solicitação. Por favor, tente novamente.",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 sm:py-16">
        <div className="max-w-5xl w-full mx-auto">
          <div className="text-center mb-10">
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-4 leading-tight relative inline-block">
                  Contato <span className="text-primary">Inteligente</span>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-primary"></span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto pt-8">
                  Preencha o formulário abaixo para iniciar seu orçamento. Nossa IA irá analisar sua solicitação para gerar uma mensagem personalizada e agilizar seu atendimento via WhatsApp.
              </p>
          </div>

          <div className="w-full max-w-3xl mx-auto bg-secondary/30 border border-border rounded-2xl p-8 shadow-2xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com" {...field} disabled={isLoading}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone (WhatsApp)</FormLabel>
                          <FormControl>
                            <Input placeholder="(XX) XXXXX-XXXX" {...field} disabled={isLoading}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Tipo de Serviço</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value} disabled={isLoading}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o serviço desejado">
                                            {field.value ? serviceOptions[field.value as keyof typeof serviceOptions]?.title : "Selecione o serviço desejado"}
                                        </SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(serviceOptions).map(([key, { title, description }]) => (
                                        <ServiceSelectItem key={key} value={key} title={title} description={description} />
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Projeto</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value} disabled={isLoading}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo de projeto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="reels">Reels / TikTok</SelectItem>
                              <SelectItem value="youtube">Vídeo para YouTube</SelectItem>
                              <SelectItem value="institucional">Vídeo Institucional</SelectItem>
                              <SelectItem value="casamento">Casamento / Evento Social</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" placeholder="Nº de vídeos" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                 </div>
                 {showDroneOption && (
                        <div className="pt-4">
                            <FormField
                                control={form.control}
                                name="droneOption"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-3 rounded-md border p-4 justify-center">
                                      <FormControl>
                                          <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                          id="drone-option"
                                          disabled={isLoading}
                                          />
                                      </FormControl>
                                      <div className="grid gap-1.5 leading-none">
                                          <label
                                          htmlFor="drone-option"
                                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                          >
                                          Incluir captação com drone?
                                          </label>
                                          <p className="text-sm text-muted-foreground">
                                           Adiciona um custo extra ao orçamento.
                                          </p>
                                      </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
                 {showRecordingFields && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="recordingDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col justify-end">
                                <FormLabel>Data da Gravação</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        disabled={isLoading}
                                        >
                                        {field.value ? (
                                            format(field.value, "dd/MM/yyyy")
                                        ) : (
                                            <span>Escolha uma data</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={isClient ? (date) => date < new Date() || date < new Date("1900-01-01") : undefined}
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="recordingLocation"
                            render={({ field }) => (
                                <FormItem className="flex flex-col justify-end">
                                <FormLabel>Local da Gravação</FormLabel>
                                <FormControl>
                                    <Input placeholder="Cidade / Estado" {...field} disabled={isLoading}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                 )}
                 {showEventSwitch && (
                    <FormField
                        control={form.control}
                        name="isEvent"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                    O projeto é para um evento específico?
                                    </FormLabel>
                                    <FormDescription>
                                    Marque se o projeto for para um casamento, festa, congresso, etc.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={isLoading}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                  )}
                {isEvent && (
                     <FormField
                        control={form.control}
                        name="eventDescription"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Descreva o Evento</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Nos conte sobre o evento: tipo, data, local, número de convidados, etc."
                                className="resize-y min-h-[100px]"
                                {...field}
                                disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                  control={form.control}
                  name="projectDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descreva seu Projeto</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nos conte o máximo de detalhes possível sobre sua ideia, incluindo objetivos, referências e o que você espera do resultado final."
                          className="resize-y min-h-[120px]"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormDescription>
                        Quanto mais detalhes, melhor nossa IA poderá te ajudar.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="references"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referências (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Cole aqui links de vídeos, sites ou outras inspirações que ajudem a gente a entender melhor seu projeto."
                          className="resize-y"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormDescription>
                        Links para YouTube, Vimeo, Instagram ou qualquer outro site são bem-vindos.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end items-center gap-4">
                  <Button type="button" variant="outline" size="lg" onClick={handleFillWithExample} disabled={isLoading}>
                    Preencher com um Exemplo
                    <TestTube2 className="ml-2 h-5 w-5" />
                  </Button>
                  <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-transform hover:scale-105" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Analisando...
                        </>
                    ) : (
                        <>
                            Analisar com IA e Iniciar Conversa
                            <Bot className="ml-2 h-5 w-5" />
                        </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
  );
}
