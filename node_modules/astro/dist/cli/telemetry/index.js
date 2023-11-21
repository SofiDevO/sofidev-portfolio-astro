import whichPm from "which-pm";
import * as msg from "../../core/messages.js";
import { telemetry } from "../../events/index.js";
async function notify() {
  const packageManager = (await whichPm(process.cwd()))?.name ?? "npm";
  await telemetry.notify(() => {
    console.log(msg.telemetryNotice(packageManager) + "\n");
    return true;
  });
}
async function update(subcommand, { flags }) {
  const isValid = ["enable", "disable", "reset"].includes(subcommand);
  if (flags.help || flags.h || !isValid) {
    msg.printHelp({
      commandName: "astro telemetry",
      usage: "[command]",
      tables: {
        Commands: [
          ["enable", "Enable anonymous data collection."],
          ["disable", "Disable anonymous data collection."],
          ["reset", "Reset anonymous data collection settings."]
        ]
      }
    });
    return;
  }
  switch (subcommand) {
    case "enable": {
      telemetry.setEnabled(true);
      console.log(msg.telemetryEnabled());
      return;
    }
    case "disable": {
      telemetry.setEnabled(false);
      console.log(msg.telemetryDisabled());
      return;
    }
    case "reset": {
      telemetry.clear();
      console.log(msg.telemetryReset());
      return;
    }
  }
}
export {
  notify,
  update
};
