#!/usr/bin/env node
import { program } from "commander";
import ora from "ora";
import simpleGit from "simple-git";
import path from "path";
import fs from "fs-extra";

program.version("1.0.0").description("Component Driven Redux Framework");

program
  .command("new <project-name>")
  .option(
    "-t --template <name>",
    "Specify Template Name like tailwindcss, bootstrap"
  )
  .description("Create a Project")
  .action(async (name, { template }) => {
    var repo = "";
    if (template) {
      repo = "https://github.com/TahsinAyman/cdr-template-" + template;
    } else {
      repo = "https://github.com/TahsinAyman/cdr-template";
    }
    const spinner = ora("Creating The Project").start();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const git = simpleGit();
    git.clone(
      repo,
      name,
      async (err) => {
        if (err) {
          spinner.fail(`Error Creating Project: ${err}`);
        } else {
          fs.remove(path.join(name, ".git"), (err) => {
            if (err) {
              spinner.fail(`Error Creating Project: ${err}`);
            } else {
              spinner.succeed(`Successfully Created Project`);
              console.log("cd " + name);
              console.log("npm install");
              console.log("npm run dev")
            }
          });
        }
      }
    );
  });

program
  .command("generate <module-name>")
  .alias("g")
  .description("Create a Module For The Project")
  .action(async (name) => {
    const spinner = ora("Creating Module").start();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const git = simpleGit();
    const directory = path.join("src/app", name);
    git.clone(
      "https://github.com/TahsinAyman/cdr-module-template",
      directory,
      async (err) => {
        if (err) {
          spinner.fail(`Error Creating Module: ${err}`);
        } else {
          fs.remove(path.join(name, ".git"), (err) => {
            if (err) {
              spinner.fail(`Error Creating Module: ${err}`);
            } else {
              spinner.succeed(`Successfully Created Module`);
            }
          });
        }
      }
    );
  });

program.parse(process.argv);
