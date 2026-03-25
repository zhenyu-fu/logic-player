import type { Strategy } from '@/types/strategy';
import type { RunLog, RunStep } from '@/types/run';
import { mockStrategies } from '@/data/strategies';
import { mockRunLogs } from '@/data/runLogs';
import { createMockRunSteps } from '@/data/runSteps';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchStrategies(): Promise<Strategy[]> {
  await sleep(120);
  console.info('[API] fetchStrategies', { count: mockStrategies.length });
  return mockStrategies;
}

export async function fetchRunLogs(): Promise<RunLog[]> {
  await sleep(120);
  console.info('[API] fetchRunLogs', { count: mockRunLogs.length });
  return mockRunLogs;
}

export async function fetchRunSteps(strategyId: string): Promise<RunStep[]> {
  await sleep(120);
  console.info('[API] fetchRunSteps', { strategyId });
  return createMockRunSteps(strategyId);
}

