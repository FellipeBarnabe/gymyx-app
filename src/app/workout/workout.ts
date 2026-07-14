import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../core/character';
import { WorkoutSessionService } from '../core/workout-session.service';
import { exerciseDatabase, MuscleGroup } from '../core/exercise-database';
import { logWorkoutSession } from '../core/progression';

type Step = 'grupo' | 'exercicios' | 'series';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './workout.html',
  styleUrl: './workout.css',
})
export class WorkoutComponent {
  private router = inject(Router);
  private characterService = inject(CharacterService);
  private sessionService = inject(WorkoutSessionService);

  step = signal<Step>('grupo');
  grupos: MuscleGroup[] = exerciseDatabase;
  grupoSelecionado = signal<MuscleGroup | null>(null);
  exerciciosSelecionados = signal<string[]>([]);

  series = signal<
    {
      nome: string;
      series: number;
      repeticoes: number;
      carga: number;
      concluido: boolean;
    }[]
  >([]);

  selecionarGrupo(grupo: MuscleGroup) {
    this.grupoSelecionado.set(grupo);
    this.sessionService.startSession(grupo.nome);
    this.step.set('exercicios');
  }

  toggleExercicio(nome: string) {
    const atual = this.exerciciosSelecionados();
    if (atual.includes(nome)) {
      this.exerciciosSelecionados.set(atual.filter((e) => e !== nome));
    } else {
      this.exerciciosSelecionados.set([...atual, nome]);
    }
  }

  confirmarExercicios() {
    const lista = this.exerciciosSelecionados().map((nome) => ({
      nome,
      series: 3,
      repeticoes: 12,
      carga: 0,
      concluido: false,
    }));
    this.series.set(lista);
    this.step.set('series');
  }

  toggleConcluido(index: number) {
    const lista = [...this.series()];
    lista[index] = { ...lista[index], concluido: !lista[index].concluido };
    this.series.set(lista);
  }

  marcarTodos() {
    const todos = this.series().map((e) => ({ ...e, concluido: true }));
    this.series.set(todos);
  }

  get algumConcluido() {
    return this.series().some((e) => e.concluido);
  }

  get todosConcluidos() {
    return this.series().every((e) => e.concluido);
  }

  finalizar() {
    const grupo = this.grupoSelecionado();
    if (!grupo) return;

    const exercicios = this.series()
      .filter((e) => e.concluido)
      .map((e) => {
        const ex = grupo.subgrupos.flatMap((s) => s.exercicios).find((x) => x.nome === e.nome);
        return {
          nome: e.nome,
          equipamento: ex?.equipamento ?? '',
          subgrupo: ex
            ? (grupo.subgrupos.find((s) => s.exercicios.some((x) => x.nome === e.nome))?.nome ?? '')
            : '',
          series: e.series,
          repeticoes: e.repeticoes,
          carga: e.carga,
        };
      });

    const { updatedCharacter, xpGanho, atributosGanhos } = logWorkoutSession(
      grupo.nome,
      exercicios,
      this.characterService.character(),
    );

    this.sessionService.finishSession(xpGanho, atributosGanhos);
    this.characterService.update(updatedCharacter);
    this.router.navigate(['/personagem']);
  }

  voltar() {
    if (this.step() === 'exercicios') {
      this.step.set('grupo');
      this.exerciciosSelecionados.set([]);
    } else if (this.step() === 'series') {
      this.step.set('exercicios');
    }
  }

  get todosExercicios() {
    return this.grupoSelecionado()?.subgrupos.flatMap((s) => s.exercicios) ?? [];
  }
}
