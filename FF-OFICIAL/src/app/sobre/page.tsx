import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Target, Eye, Gem, HeartHandshake, Tv, Wrench, PackageCheck, LayoutDashboard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre - FastFilms',
  description: 'Conheça a nossa história, nossa filosofia e a rede de talentos parceiros prontos para transformar sua ideia em realidade.',
};

const teamData = {
  founders: [
    {
      name: 'Samuel',
      role: ['Co-Fundador &', 'Diretor Criativo'],
      imageUrl: '/index/Equipe/samuel.jpg',
      dataAiHint: 'man portrait',
    },
    {
      name: 'Kléuver',
      role: ['Co-Fundador &', 'Diretor de Produção'],
      imageUrl: '/index/Equipe/kleuver.png',
      dataAiHint: 'man portrait',
    },
  ],
  paidTraffic: [
    {
      name: 'Kênia Michelle',
      role: 'Gerente de Tráfego Pago',
      imageUrl: '/index/Equipe/K-MICHELLE1.png',
      dataAiHint: 'woman portrait',
    },
  ],
  editors: [
    {
      name: 'Eduardo',
      role: 'Editor de Vídeo',
      imageUrl: '/index/Equipe/guess.svg',
      dataAiHint: 'person portrait placeholder',
    },
    {
      name: 'Pedro C.',
      role: 'Editor de Vídeo',
      imageUrl: '/index/Equipe/guess.svg',
      dataAiHint: 'person portrait placeholder',
    },
    {
      name: 'Luis',
      role: 'Editor de Vídeo',
      imageUrl: '/index/Equipe/guess.svg',
      dataAiHint: 'person portrait placeholder',
    },
  ],
  filmmakers: [
    {
        name: 'Clécio',
        role: 'Filmaker',
        imageUrl: '/index/Equipe/guess.svg',
        dataAiHint: 'person portrait placeholder',
    },
    {
        name: 'Pedro P.',
        role: 'Filmaker',
        imageUrl: '/index/Equipe/guess.svg',
        dataAiHint: 'person portrait placeholder',
    },
  ],
};

const sectionTitles: { [key: string]: string } = {
    founders: 'Fundadores',
    paidTraffic: 'Tráfego Pago',
    editors: 'Editores',
    filmmakers: 'Filmmakers',
};

const aboutUsData = [
    {
        icon: Target,
        title: 'Missão',
        description: 'Criar vídeos autênticos e envolventes que ampliam a presença digital dos clientes.',
    },
    {
        icon: Eye,
        title: 'Visão',
        description: 'Se tornar referência local e alcançar estabilidade no mercado em até 5 anos.',
    },
    {
        icon: Gem,
        title: 'Valores',
        description: 'Qualidade, Criatividade e Experiência do Cliente.',
    },
];

const differentialsData = [
    {
        icon: LayoutDashboard,
        title: 'TrackFilms',
        description: (
            <>
                Nosso compromisso com a <strong className="font-bold text-primary">Experiência do Cliente</strong>: acompanhe o progresso do seu projeto em tempo real, com ferramentas de comentário e aprovação que eliminam ruídos de comunicação e centralizam o feedback, garantindo transparência total da gravação à entrega.
            </>
        ),
    },
    {
        icon: Tv,
        title: 'Foco em Redes Sociais',
        description: 'Somos especialistas em criar vídeos otimizados para as redes sociais, projetados para conectar e engajar seu público de forma autêntica.',
    },
    {
        icon: PackageCheck,
        title: 'Equipamentos de Ponta',
        description: 'Utilizamos as mais modernas técnicas de produção e um arsenal técnico de alta qualidade para garantir excelência visual em cada frame.',
    },
    {
        icon: Wrench,
        title: 'Ajustes Flexíveis',
        description: 'Acreditamos na parceria. Oferecemos ajustes para garantir que o resultado final supere suas expectativas e reflita sua visão original.',
    },
];

const ProfileCard = ({ name, role, imageUrl, dataAiHint }: { name: string; role: string | string[]; imageUrl: string; dataAiHint: string; }) => (
  <Card className="overflow-hidden text-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-primary/20 hover:shadow-lg w-[280px]">
    <CardContent className="p-0">
      <div className="relative aspect-square w-full">
        <Image
          src={imageUrl}
          alt={`Retrato de ${name}`}
          fill
          className="object-cover"
          data-ai-hint={dataAiHint}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-foreground">{name}</h3>
        <div className="text-sm text-primary">
          {Array.isArray(role) ? (
            role.map((line, index) => <p key={index}>{line}</p>)
          ) : (
            <p>{role}</p>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function SobrePage() {
  return (
    <>
        <section className="pt-12 pb-20 sm:pt-16 sm:pb-24 text-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-5">NOSSA HISTÓRIA, NOSSA ESSÊNCIA</p>
                <h1 className="text-5xl lg:text-7xl font-extrabold mb-4 leading-tight relative pb-4 inline-block">
                    Unindo criatividade e <span className="text-primary">estratégia</span>.
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-primary"></span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-8">
                    Somos mais que uma produtora: somos parceiros na construção de narrativas que cativam, engajam e geram resultados através de uma experiência tecnológica e transparente.
                </p>
            </div>
        </section>

        <section className="pb-20 sm:pb-24">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-5">NOSSA IDENTIDADE</p>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-12 relative inline-block">
                    Sobre <span className="text-primary">Nós</span>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    {aboutUsData.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Card key={item.title} className="bg-secondary/30 border-border text-center p-8 flex flex-col items-center gap-4">
                                <div className="bg-primary/10 text-primary p-4 rounded-full">
                                    <Icon className="h-10 w-10" />
                                </div>
                                <h3 className="text-2xl font-bold">{item.title}</h3>
                                <p className="text-muted-foreground">{item.description}</p>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
        
        <section className="pb-20 sm:pb-24">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-5">NOSSO JEITO DE FAZER</p>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-12 relative inline-block">
                    Nossos <span className="text-primary">Diferenciais</span>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {differentialsData.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Card key={item.title} className="bg-secondary/30 border-border text-center p-8 flex flex-col items-center gap-4">
                                <div className="bg-primary/10 text-primary p-4 rounded-full">
                                    <Icon className="h-10 w-10" />
                                </div>
                                <h3 className="text-2xl font-bold">{item.title}</h3>
                                <div className="text-muted-foreground">{item.description}</div>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>

        <Separator className="my-12 sm:my-16 bg-border/50 max-w-4xl mx-auto" />


        <div className="pb-20 sm:pb-24">
            <div className="text-center mb-16 px-6">
                <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-5">CADA UM COM SUA ESPECIALIDADE</p>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight relative pb-4 inline-block">
                    Mas todo mundo <span className="text-primary">resolve</span>.
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mt-4 max-w-2xl mx-auto">
                    Tem quem grava, quem edita, quem anima. Mas na dúvida, todo mundo põe a mão onde for preciso. Conheça as mentes por trás dos projetos.
                </p>
            </div>
            {Object.entries(teamData).map(([sectionKey, members]) => (
                 <section key={sectionKey} className="mb-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                        <h3 className="text-3xl font-bold text-center mb-12 relative inline-block">
                            {sectionTitles[sectionKey]}
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></span>
                        </h3>
                        <div className="flex flex-wrap justify-center gap-8">
                            {members.map(member => (
                                <ProfileCard key={member.name} {...member} />
                            ))}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    </>
  );
}
