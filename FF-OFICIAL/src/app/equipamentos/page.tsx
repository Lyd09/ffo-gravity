
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  workstationData,
  fieldEquipmentData,
  softwareData,
} from './equipmentData';
import WorkstationCard from '@/components/custom/WorkstationCard';
import EquipmentCard from '@/components/custom/EquipmentCard';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PackagePlus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Equipamentos - FastFilms',
  description:
    'Conheça nosso arsenal técnico. Equipamentos de ponta para garantir a máxima qualidade em cada projeto.',
};

export default function EquipamentosPage() {
  return (
    <>
      {/* Ato I: Workstations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-center relative inline-block">
              Nossas <span className="text-primary">Workstations</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Tem arte, tem café, tem alma. Mas também tem hardware robusto, software de ponta e equipamentos que aguentam o tranco.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
            {workstationData.map((ws) => {
               const [brand, ...rest] = ws.title.split(' ');
               const title = (
                <>
                  <span className="text-primary">{brand}</span> {rest.join(' ')}
                </>
               );
              return <WorkstationCard key={ws.title} {...ws} title={title} />
            })}
          </div>
        </div>
      </section>

      {/* Ato II: Equipamentos de Campo */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-center relative inline-block">
              Equipamentos de <span className="text-primary">Campo</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Câmeras afiadas, áudio cristalino e softwares que fazem tudo ganhar forma e ritmo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fieldEquipmentData.map((equip) => (
              <EquipmentCard key={equip.name} {...equip} />
            ))}
          </div>
        </div>
      </section>

      {/* Ato III: Software */}
      <section className="pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-center relative inline-block">
                  Softwares
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                  Onde a mágica da pós-produção acontece. As ferramentas digitais que dão vida às imagens capturadas.
                  </p>
              </div>
              <Card className="bg-secondary/30 border-border shadow-lg">
                  <CardContent className="p-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center">
                      {softwareData.map((soft) => {
                          const Icon = soft.icon;
                          return (
                              <div key={soft.name} className="flex flex-col items-center text-center gap-4">
                                  <div className="flex items-center gap-4 mb-2">
                                    <div className="bg-primary/10 text-primary p-3 rounded-xl">
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-left">{soft.name}</h3>
                                  </div>
                                  <div className="relative aspect-square w-32 mb-2">
                                      <Image
                                      src={soft.imageUrl}
                                      alt={soft.name}
                                      fill
                                      className="object-contain rounded-full"
                                      data-ai-hint={soft.dataAiHint}
                                      />
                                  </div>
                                  <p className="text-muted-foreground text-sm">{soft.description}</p>
                              </div>
                          );
                      })}
                      </div>
                  </CardContent>
              </Card>
          </div>
      </section>


      {/* Ato IV: O Arsenal Completo */}
      <section className="pb-20 sm:pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Separator className="my-12 bg-white/50" />
          <div className="flex flex-col items-center text-center">
            <Card className="bg-secondary/30 border-border p-4 inline-flex items-center gap-4 rounded-xl mb-4">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <PackagePlus className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">E Muito Mais</h3>
            </Card>
            <p className="text-muted-foreground max-w-2xl">
              Além do que listamos, nosso arsenal está sempre crescendo. Contamos com uma variedade de acessórios e equipamentos profissionais para garantir que cada projeto tenha exatamente o que precisa para brilhar.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
