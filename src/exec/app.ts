import { AppType } from "app/index"
import { formatJSON, tryToFixJSON, validateJSON } from "./json"

type ExecAppOption = {
  name: string
  handleInput: (input: string) => string
}

export type ExecApp = {
  validateInput: (input: string) => boolean
  options: ExecAppOption[]
}

export const execApps: ExecApp[] = [
  {
    validateInput: validateJSON,
    options: [
      {
        name: "Try to fix",
        handleInput: tryToFixJSON
      },
      {
        name: 'Format',
        handleInput: formatJSON
      }
    ]
  }
]