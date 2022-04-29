import { ExecException } from "node:child_process";

export class ErrorExec {
  constructor(public stdout: string, public error: ExecException) {}
}
