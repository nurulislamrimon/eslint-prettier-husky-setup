'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const colors_1 = __importDefault(require('colors'))
const app_1 = __importDefault(require('./app/app'))
const config_1 = __importDefault(require('./config/config'))
app_1.default.listen(config_1.default.port, () => {
  console.log(
    colors_1.default.magenta(
      `Example app listening on port ${config_1.default.port}`
    )
  )
})
