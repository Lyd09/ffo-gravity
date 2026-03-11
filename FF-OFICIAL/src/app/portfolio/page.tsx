
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle, ExternalLink, Camera, Link2Off } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Portfólio - FastFilms',
  description: 'Explore nossos projetos recentes e veja a qualidade e a criatividade que trazemos para cada vídeo.',
};

const portfolioProjects = [
    {
        title: 'Animação de landing page para My Broker Lagoa Santa',
        imageUrl: '/index/Portfolio/ALGORITMO.png',
        videoUrl: 'https://www.instagram.com/p/DSKy1ZaEamv/',
        dataAiHint: 'landing page animation',
    },
    {
        title: 'VÍDEOS QUE CONECTAM',
        imageUrl: '/index/Portfolio/CONECTAM.png',
        videoUrl: 'https://www.instagram.com/p/DSI2IUckc45/',
        dataAiHint: 'luxury real estate',
    },
    {
        title: 'A TRANSCRIÇÃO DE UM LUGAR Para a tela condomínio mirante do fidalgo',
        imageUrl: '/index/Portfolio/TELA.png',
        videoUrl: 'https://www.instagram.com/reel/DOZNsJCER89/?utm_source=ig_web_button_share_sheet&igsh=ZjF0eHhtb3Y4YnRt',
        dataAiHint: 'social media video',
    },
    {
        title: 'NOVO CONCEITO DE Investimento Lagoa Santa-MG',
        imageUrl: '/index/Portfolio/INVESTIMENTO.png',
        videoUrl: 'https://www.instagram.com/reel/DLaHI3LuUg7/?utm_source=ig_web_copy_link&igsh=MXdqazN3cmpnejVxMA==',
        dataAiHint: 'corporate event',
    },
    {
        title: 'Vídeo "Onde o tempo respira" para Fazenda do Moinho',
        imageUrl: '/index/Portfolio/RESPIRA.png',
        videoUrl: 'https://www.instagram.com/p/DLSZ3--u8Ze/',
        dataAiHint: 'nature cinematic',
    },
    {
        title: 'Gravação no mercado imobiliário no Condomínio Retiro das Águas',
        imageUrl: '/index/Portfolio/IMOBILIARIO.png',
        videoUrl: 'https://www.instagram.com/p/DHlmBdQRDy3/',
        dataAiHint: 'real estate videography',
    },
    {
        title: 'Gravação de uma casa de R$15.000.000,00 no Condomínio Estâncias das Amendoeiras',
        imageUrl: '/index/Portfolio/CASA-15M.png',
        videoUrl: 'https://www.instagram.com/p/DGipg9IRg5g/',
        dataAiHint: 'luxury real estate',
    },
    {
        title: 'Dia de gravação no Condomínio Estância das Amendoeiras',
        imageUrl: '/index/Portfolio/GRAVACAO.png',
        videoUrl: 'https://www.instagram.com/p/DGGx-zExFu4/',
        dataAiHint: 'videography session',
    },
];

const logoAnimations = [
  { title: 'LOGO 1', youtubeVideoId: 'qgCDfWAKYms' },
  { title: 'LOGO 2', youtubeVideoId: 'OHTmhYbkGGo' },
  { title: 'LOGO 3', youtubeVideoId: 'kgE_IZtC2bg' },
  { title: 'LOGO 4', youtubeVideoId: 'ayjontxDtJA' },
  { title: 'LOGO 5', youtubeVideoId: 'WKUUjCIYYF4' },
  { title: 'LOGO 6', youtubeVideoId: 'MH-9Ow_gxU0' },
  { title: 'LOGO 7', youtubeVideoId: 'pN1h6mSSeVE' },
  { title: 'LOGO 8', youtubeVideoId: 'mxrLwa-nW7Y' },
  { title: 'LOGO 9', youtubeVideoId: '0IRmDP8XZ3k' },
];

const socialMediaPosts = [
    { client: 'Criativo', imageUrl: '/index/Criativos/BURGUER-HALLOWEEN.png', dataAiHint: 'creative social media post' },
    { client: 'Criativo', imageUrl: '/index/Criativos/CONTRATO.png', dataAiHint: 'creative social media post' },
    { client: 'Criativo', imageUrl: '/index/Criativos/DENTES.png', dataAiHint: 'creative social media post' },
    { client: 'Criativo', imageUrl: '/index/Criativos/FF-BLACKFRIDAY.png', dataAiHint: 'creative social media post' },
    { client: 'Criativo', imageUrl: '/index/Criativos/MADEIRA.png', dataAiHint: 'creative social media post' },
    { client: 'Criativo', imageUrl: '/index/Criativos/MYBK-GERENTE.png', dataAiHint: 'creative social media post' },
    { client: 'Criativo', imageUrl: '/index/Criativos/MYBK-GERENTE2.png', dataAiHint: 'creative social media post' },
    { client: 'Criativo', imageUrl: '/index/Criativos/MYBK-GERENTE3.png', dataAiHint: 'creative social media post' },
    { client: 'Criativo', imageUrl: '/index/Criativos/NATAL.png', dataAiHint: 'creative social media post' },
    { client: 'Criativo', imageUrl: '/index/Criativos/DIEGO.png', dataAiHint: 'creative social media post' },
];

const photoFileNames = [
    "DSC03865.jpg", "DSC03867.jpg", "DSC03880.jpg", "DSC03911.jpg", "DSC03913.jpg", 
    "DSC03914.jpg", "DSC03922.jpg", "DSC03926.jpg", "DSC03928.jpg", "DSC03933.jpg", 
    "DSC03934.jpg", "DSC03935.jpg", "DSC03936.jpg", "DSC03942.jpg", "DSC03961.jpg", 
    "DSC03970.jpg", "DSC03984.jpg", "DSC03990.jpg", "DSC04016.jpg", "DSC04030.jpg", 
    "DSC04048.jpg", "DSC04056.jpg", "DSC04062.jpg", "DSC04064.jpg", "DSC04069.jpg", 
    "DSC04085.jpg", "DSC04099.jpg", "DSC04124.jpg", "DSC04144.jpg", "DSC04222.jpg", 
    "DSC04250.jpg", "DSC04317.jpg", "DSC04332.jpg", "DSC04341.jpg", "DSC04374.jpg", 
    "DSC04394.jpg", "DSC04422.jpg", "DSC04530.jpg", "DSC04546.jpg", "DSC04556.jpg"
];

const eventPhotos = photoFileNames.map((fileName) => ({
    alt: `Foto do evento - ${fileName}`,
    imageUrl: `/index/Portfolio/Fotografia/${fileName}`,
    dataAiHint: `event photography`
}));


export default function PortfolioPage() {
  return (
    <>
      <section className="pt-12 pb-20 sm:pt-16 sm:pb-24 text-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-4 leading-tight relative pb-4 inline-block">
                Nosso <span className="text-primary">Portfólio</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-primary"></span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-8">
                Tudo aqui passou pelo nosso crivo criativo (e por umas boas horas de render). Explore nossos projetos de vídeo e desenvolvimento web.
            </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-5">AÇÃO, CÂMERA, PLAY</p>
            <h2 className="text-3xl font-bold relative inline-block">
              Projetos de <span className="text-primary">Vídeo</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => (
              <Link key={project.title} href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="group">
                <Card className="relative aspect-[9/16] overflow-hidden rounded-xl border-2 border-transparent hover:border-primary transition-all duration-300">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    data-ai-hint={project.dataAiHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle className="h-20 w-20 text-white drop-shadow-lg" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Separator className="my-12 sm:my-16 bg-border/50 max-w-4xl mx-auto" />

      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-5">A PRIMEIRA IMPRESSÃO</p>
            <h2 className="text-3xl font-bold relative inline-block">
              Animação de <span className="text-primary">Logomarca</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {logoAnimations.map((animation) => (
              <div key={animation.title}>
                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-border bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${animation.youtubeVideoId}`}
                    title={animation.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <h3 className="text-center font-bold mt-4 text-lg">{animation.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Separator className="my-12 sm:my-16 bg-border/50 max-w-4xl mx-auto" />

      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-5">MOMENTOS E DETALHES</p>
            <h2 className="text-3xl font-bold relative inline-block">
                Fotografia
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></span>
            </h2>
          </div>
          <Carousel
              opts={{
                  align: "start",
                  loop: true,
              }}
              className="w-full"
          >
              <CarouselContent>
                  {eventPhotos.map((photo) => (
                      <CarouselItem key={photo.imageUrl} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                          <div className="p-1">
                              <Card className="relative aspect-[9/16] overflow-hidden rounded-xl border-2 border-transparent group">
                              <Image
                                  src={photo.imageUrl}
                                  alt={photo.alt}
                                  width={500}
                                  height={889}
                                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                                  data-ai-hint={photo.dataAiHint}
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <Camera className="h-16 w-16 text-white drop-shadow-lg" />
                              </div>
                              </Card>
                          </div>
                      </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious className="ml-14" />
              <CarouselNext className="mr-14" />
          </Carousel>
        </div>
      </section>

      <Separator className="my-12 sm:my-16 bg-border/50 max-w-4xl mx-auto" />

      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
                <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-5">DESIGN E CONTEÚDO</p>
                <h2 className="text-3xl font-bold relative inline-block">
                Posts para <span className="text-primary">Redes Sociais</span>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></span>
                </h2>
            </div>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {socialMediaPosts.map((post) => (
                    <CarouselItem key={post.imageUrl} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                        <div className="p-1">
                            <div className="group">
                                <Card className="relative aspect-square overflow-hidden rounded-xl border-2 border-transparent bg-black group-hover:border-primary transition-all duration-300">
                                <Image
                                    src={post.imageUrl}
                                    alt={`Post para ${post.client}`}
                                    width={1080}
                                    height={1080}
                                    className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    data-ai-hint={post.dataAiHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <h3 className="text-white font-bold text-lg drop-shadow-md">{post.client}</h3>
                                </div>
                                </Card>
                            </div>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-14" />
                <CarouselNext className="mr-14" />
            </Carousel>
        </div>
      </section>

      <Separator className="my-12 sm:my-16 bg-border/50 max-w-4xl mx-auto" />

      <section className="pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="text-center mb-12">
             <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-5">PRESENÇA DIGITAL</p>
             <h2 className="text-3xl font-bold text-center relative inline-block">
                Desenvolvimento de <span className="text-primary">Sites</span>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></span>
             </h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-secondary/30 border-border shadow-lg overflow-hidden flex flex-col">
                    <div className="relative aspect-video w-full">
                        <Image
                            src="/index/Portfolio/Sites/ana.png"
                            alt="Screenshot do site da Ana Araújo Corretora"
                            fill
                            className="object-cover"
                            data-ai-hint="real estate website"
                        />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold text-primary">Ana Araújo | Corretora</h3>
                        <p className="text-muted-foreground mt-2 mb-6 flex-grow">
                            Desenvolvemos uma landing page simples e direta para a corretora de imóveis Ana Araújo, focada em Lagoa Santa e região. O site foi criado para oferecer uma experiência de usuário fluida, com design moderno e totalmente responsivo para capturar leads de forma eficiente.
                        </p>
                        <div className="flex items-center gap-4 flex-wrap">
                            <Link href="https://corretoraanaaraujo.com.br/" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline">
                                    Visitar Site
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
                <Card className="bg-secondary/30 border-border shadow-lg overflow-hidden flex flex-col">
                    <div className="relative aspect-video w-full">
                        <Image
                            src="/index/Portfolio/Sites/kenia.png"
                            alt="Screenshot do site da Kênia Michelle"
                            fill
                            className="object-cover"
                            data-ai-hint="marketing specialist website"
                        />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold text-primary">Kênia Michelle | Especialista em Marketing</h3>
                        <p className="text-muted-foreground mt-2 mb-6 flex-grow">
                            O Desafio: Kênia Michelle, uma talentosa estrategista de marketing, precisava de uma plataforma digital que refletisse seu profissionalismo, sua experiência e sua abordagem moderna. O objetivo era criar um site que não apenas funcionasse como um portfólio, mas também como uma poderosa ferramenta de captação de clientes, transmitindo elegância e autoridade.
                        </p>
                        <div className="flex items-center gap-4 flex-wrap">
                           <Link href="http://keniamichelle.com.br/" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline">
                                    Visitar Site
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
                <Card className="bg-secondary/30 border-border shadow-lg overflow-hidden flex flex-col">
                    <div className="relative aspect-video w-full">
                        <Image
                            src="/index/Portfolio/Sites/beija-flores1.png"
                            alt="Screenshot do site da My Broker"
                            fill
                            className="object-cover"
                            data-ai-hint="real estate website"
                        />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold text-primary">Landing page | My Broker</h3>
                        <p className="text-muted-foreground mt-2 mb-6 flex-grow">
                            Uma landing page de alta conversão projetada para capturar leads no competitivo mercado imobiliário. Focada em uma experiência de usuário direta e um design limpo para maximizar os resultados.
                        </p>
                        <div className="flex items-center gap-4 flex-wrap">
                            <Link href="https://mybrokerlagoasanta.com.br/" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline">
                                    Visitar Site
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
                <Card className="bg-secondary/30 border-border shadow-lg overflow-hidden flex flex-col">
                    <div className="relative aspect-video w-full">
                        <Image
                            src="/index/Portfolio/Sites/vitoriaTPrime.png"
                            alt="Screenshot do site da GSP Engenharia"
                            fill
                            className="object-cover"
                            data-ai-hint="real estate website"
                        />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold text-primary">GSP Engenharia | Imóvel em condo. fechado</h3>
                        <p className="text-muted-foreground mt-2 mb-6 flex-grow">
                            Landing page estratégica para o lançamento de um imóvel em condomínio fechado. O design foi pensado para gerar expectativa e capturar leads qualificados antes mesmo do lançamento oficial.
                        </p>
                        <div className="flex items-center gap-4 flex-wrap">
                            <Link href="http://xn--gspengenhariaservios-l1b.com.br/" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline">
                                    Visitar Site
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
           </div>
        </div>
      </section>
    </>
  );
}
