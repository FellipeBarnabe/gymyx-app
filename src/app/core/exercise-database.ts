export interface Exercise {
  nome: string;
  equipamento: string;
  grupoMuscular: string;
  subgrupo: string;
}

export interface MuscleGroup {
  nome: string;
  subgrupos: SubGroup[];
}

export interface SubGroup {
  nome: string;
  exercicios: Exercise[];
}

export const exerciseDatabase: MuscleGroup[] = [
  {
    nome: 'Peito, Ombro e Tríceps',
    subgrupos: [
      {
        nome: 'Peito',
        exercicios: [
          {
            nome: 'Supino Reto',
            equipamento: 'Barra livre / banco',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Peito',
          },
          {
            nome: 'Supino Inclinado',
            equipamento: 'Barra livre / banco inclinado',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Peito',
          },
          {
            nome: 'Supino Declinado',
            equipamento: 'Barra livre / banco declinado',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Peito',
          },
          {
            nome: 'Crossover Polia Alta',
            equipamento: 'Crossover (peito inferior)',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Peito',
          },
          {
            nome: 'Crossover Polia Média',
            equipamento: 'Crossover (peito central)',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Peito',
          },
          {
            nome: 'Flexão',
            equipamento: 'Peso corporal',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Peito',
          },
          {
            nome: 'Supino na Máquina',
            equipamento: 'Máquina',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Peito',
          },
        ],
      },
      {
        nome: 'Ombro',
        exercicios: [
          {
            nome: 'Elevação Lateral',
            equipamento: 'Halteres',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Ombro',
          },
          {
            nome: 'Elevação Frontal',
            equipamento: 'Halteres',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Ombro',
          },
          {
            nome: 'Elevação Posterior na Polia',
            equipamento: 'Polia',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Ombro',
          },
          {
            nome: 'Ombro na Máquina',
            equipamento: 'Máquina',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Ombro',
          },
        ],
      },
      {
        nome: 'Tríceps',
        exercicios: [
          {
            nome: 'Tríceps Barrinha',
            equipamento: 'Polia alta com barrinha',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Tríceps',
          },
          {
            nome: 'Tríceps Corda',
            equipamento: 'Polia alta com corda',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Tríceps',
          },
          {
            nome: 'Tríceps Testa',
            equipamento: 'Barra EZ / halteres',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Tríceps',
          },
        ],
      },
      {
        nome: 'Abdômen',
        exercicios: [
          {
            nome: 'Abdominal',
            equipamento: 'Solo / colchonete',
            grupoMuscular: 'Peito, Ombro e Tríceps',
            subgrupo: 'Abdômen',
          },
        ],
      },
    ],
  },
  {
    nome: 'Costas, Bíceps e Antebraço',
    subgrupos: [
      {
        nome: 'Costas',
        exercicios: [
          {
            nome: 'Puxada Frontal Pronada',
            equipamento: 'Polia alta (pegada aberta pronada)',
            grupoMuscular: 'Costas, Bíceps e Antebraço',
            subgrupo: 'Costas',
          },
          {
            nome: 'Puxada Supinada',
            equipamento: 'Polia alta (pegada supinada)',
            grupoMuscular: 'Costas, Bíceps e Antebraço',
            subgrupo: 'Costas',
          },
          {
            nome: 'Puxada Neutra (Triângulo)',
            equipamento: 'Polia alta com triângulo',
            grupoMuscular: 'Costas, Bíceps e Antebraço',
            subgrupo: 'Costas',
          },
          {
            nome: 'Voador',
            equipamento: 'Máquina de voador',
            grupoMuscular: 'Costas, Bíceps e Antebraço',
            subgrupo: 'Costas',
          },
          {
            nome: 'Polia com Barrinha',
            equipamento: 'Polia baixa com barrinha',
            grupoMuscular: 'Costas, Bíceps e Antebraço',
            subgrupo: 'Costas',
          },
          {
            nome: 'Remada Baixa',
            equipamento: 'Máquina de remada',
            grupoMuscular: 'Costas, Bíceps e Antebraço',
            subgrupo: 'Costas',
          },
          {
            nome: 'Remada Curvada',
            equipamento: 'Barra 28kg',
            grupoMuscular: 'Costas, Bíceps e Antebraço',
            subgrupo: 'Costas',
          },
        ],
      },
      {
        nome: 'Bíceps',
        exercicios: [
          {
            nome: 'Rosca Direta',
            equipamento: 'Barra ou halteres',
            grupoMuscular: 'Costas, Bíceps e Antebraço',
            subgrupo: 'Bíceps',
          },
          {
            nome: 'Rosca Martelo',
            equipamento: 'Halteres',
            grupoMuscular: 'Costas, Bíceps e Antebraço',
            subgrupo: 'Bíceps',
          },
          {
            nome: 'Rosca Scott',
            equipamento: 'Banco Scott / barra EZ',
            grupoMuscular: 'Costas, Bíceps e Antebraço',
            subgrupo: 'Bíceps',
          },
          {
            nome: 'Rosca Inclinada',
            equipamento: 'Halteres / banco inclinado',
            grupoMuscular: 'Costas, Bíceps e Antebraço',
            subgrupo: 'Bíceps',
          },
        ],
      },
      {
        nome: 'Antebraço',
        exercicios: [
          {
            nome: 'Rosca de Antebraço',
            equipamento: 'Barra 14kg',
            grupoMuscular: 'Costas, Bíceps e Antebraço',
            subgrupo: 'Antebraço',
          },
        ],
      },
    ],
  },
  {
    nome: 'Pernas',
    subgrupos: [
      {
        nome: 'Pernas',
        exercicios: [
          {
            nome: 'Agachamento',
            equipamento: 'Barra livre / rack',
            grupoMuscular: 'Pernas',
            subgrupo: 'Pernas',
          },
          {
            nome: 'Leg Press',
            equipamento: 'Máquina leg press',
            grupoMuscular: 'Pernas',
            subgrupo: 'Pernas',
          },
          {
            nome: 'Flexora',
            equipamento: 'Máquina flexora',
            grupoMuscular: 'Pernas',
            subgrupo: 'Pernas',
          },
          {
            nome: 'Abdutora',
            equipamento: 'Máquina abdutora',
            grupoMuscular: 'Pernas',
            subgrupo: 'Pernas',
          },
          {
            nome: 'Panturrilha na Máquina',
            equipamento: 'Máquina de panturrilha',
            grupoMuscular: 'Pernas',
            subgrupo: 'Pernas',
          },
          {
            nome: 'Panturrilha no Hack',
            equipamento: 'Hack machine',
            grupoMuscular: 'Pernas',
            subgrupo: 'Pernas',
          },
        ],
      },
    ],
  },
];
