
'use server';
/**
 * @fileOverview Flow to generate a personalized WhatsApp message from contact form data.
 *
 * - generateWhatsAppMessage - A function that takes form data and returns a WhatsApp message string.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import mappings from './mappings.json';

// This schema defines the data structure the AI flow expects from the frontend.
const GenerateWhatsAppMessageInputSchema = z.object({
  name: z.string().describe('The full name of the potential client.'),
  email: z.string().email().describe('The email address of the potential client.'),
  phone: z.string().describe('The WhatsApp phone number of the potential client.'),
  serviceType: z.enum(["gravacao", "producao", "edicao", "drone", "software", "site", "outro"]).describe('The type of service the client is interested in.'),
  droneOption: z.boolean().optional().describe('Whether the client wants to include drone footage (only for "producao" service).'),
  projectType: z.enum(["reels", "youtube", "institucional", "casamento", "outro"]).describe('The type of project the client has in mind.'),
  quantity: z.coerce.number().min(1, { message: "A quantidade deve ser de pelo menos 1." }).describe('The quantity of videos or items for the project.'),
  recordingDate: z.string().optional().describe('The preferred date for recording (if applicable). Format: dd/MM/yyyy.'),
  recordingLocation: z.string().optional().describe('The location for the recording (if applicable).'),
  isEvent: z.boolean().describe('Whether the project is for a specific event.'),
  eventDescription: z.string().optional().describe('A description of the event (if applicable).'),
  projectDetails: z.string().describe('A detailed description of the project provided by the client.'),
  references: z.string().optional().describe('Optional links to references or inspirations provided by the client.'),
});

// Schema for the prompt input after mapping enums to human-readable strings.
const PromptInputSchema = GenerateWhatsAppMessageInputSchema.extend({
  serviceType: z.string(),
  projectType: z.string(),
});

export type GenerateWhatsAppMessageInput = z.infer<typeof GenerateWhatsAppMessageInputSchema>;


const { serviceTypeMap, projectTypeMap } = mappings;

const messageGenerationPrompt = ai.definePrompt({
    name: 'messageGenerationPrompt',
    input: { schema: PromptInputSchema },
    output: { schema: z.string().nullable() },
    prompt: `Você é um assistente virtual da FastFilms, uma produtora de vídeo e desenvolvedora de software. Sua tarefa é criar uma mensagem de saudação amigável e profissional para iniciar uma conversa no WhatsApp, com base nos dados do formulário de contato preenchido pelo cliente.

A mensagem deve ser:
- Em português do Brasil.
- Começar com uma saudação ao cliente, usando o nome dele. Ex: "Olá, [Nome]! Tudo bem? 😊"
- Apresentar-se como parte da equipe da FastFilms. Ex: "Aqui é da FastFilms."
- Agradecer o contato e a solicitação de orçamento.
- Confirmar o interesse no serviço principal e no tipo de projeto.
- Resumir de forma concisa e em tópicos os detalhes mais importantes do projeto para mostrar que você entendeu a necessidade dele.
- Terminar com uma despedida cordial e uma pergunta aberta para iniciar a conversa. Ex: "Adoraria conversar mais para entender todos os detalhes e te ajudar a tirar essa ideia do papel. Quando seria um bom momento para você?"
- Use emojis de forma moderada e profissional para tornar a mensagem mais amigável.

Dados do Cliente para usar na mensagem:
- Nome: {{{name}}}
- Tipo de Serviço: {{{serviceType}}}
- Tipo de Projeto: {{{projectType}}}
- Quantidade: {{{quantity}}}
{{#if droneOption}}- Adicional: Captação com Drone{{/if}}
{{#if recordingDate}}- Data da Gravação: {{{recordingDate}}}{{/if}}
{{#if recordingLocation}}- Local da Gravação: {{{recordingLocation}}}{{/if}}
{{#if isEvent}}- Detalhes do Evento: {{{eventDescription}}}{{/if}}
- Detalhes do Projeto: {{{projectDetails}}}
{{#if references}}- Referências: {{{references}}}{{/if}}

Exemplo de Mensagem Final:
"Olá, João Silva! Tudo bem? 😊 Aqui é da equipe FastFilms. Recebemos sua solicitação de orçamento e agradecemos pelo seu contato!

Vi que você está interessado em um projeto de Produção de Vídeo para um Vídeo Institucional.

Aqui estão os detalhes que anotei:
- Quantidade: 5 vídeos
- Adicional: Captação com Drone
- Local da Gravação: São Paulo, SP
- Detalhes: Gostaria de um vídeo moderno para minha marca, com foco nos bastidores.

Adoraria conversar mais para entender todos os detalhes e te ajudar a tirar essa ideia do papel.

Quando seria um bom momento para você?"
`,
});

const generateWhatsAppMessageFlow = ai.defineFlow(
  {
    name: 'generateWhatsAppMessageFlow',
    inputSchema: GenerateWhatsAppMessageInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const mappedInput = {
        ...input,
        serviceType: serviceTypeMap[input.serviceType as keyof typeof serviceTypeMap] || input.serviceType,
        projectType: projectTypeMap[input.projectType as keyof typeof projectTypeMap] || input.projectType,
    };
    
    const { output } = await messageGenerationPrompt(mappedInput);
    
    if (!output) {
      console.error('ERROR: [IA Flow] A IA retornou uma resposta nula ou vazia.');
      return `Olá, ${input.name}! Aqui é da FastFilms. Recebemos sua solicitação, mas não consegui gerar a mensagem personalizada. Poderia nos contar um pouco sobre o seu projeto?`;
    }

    return output;
  }
);


export async function generateWhatsAppMessage(input: GenerateWhatsAppMessageInput): Promise<string> {
    return await generateWhatsAppMessageFlow(input);
}
