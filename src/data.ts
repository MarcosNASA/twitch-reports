import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"

import { Afordin } from "./types"

export const data = JSON.parse(
  await fs.readFile(
    path.join(
      process.cwd(),
      "src/afordin.json"
    ),
    "utf8"
  )
) as Afordin
