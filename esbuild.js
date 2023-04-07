/* eslint-disable no-useless-escape */
// esbuild.js
import { execSync } from "child_process"
import { build, context } from "esbuild"
import fs from "fs"
import figlet from "figlet"
import nwbuild from "nw-builder";

// INSTALL MAGICK IF YOU ARE ON LINUX
console.log("\u001b[36mInstalling dependencies...\u001b[37m")

const pkg = JSON.parse(fs.readFileSync("./package.json"))

const watch = process.argv.includes("--watch")
const dev = process.argv.includes("--dev") || process.env.NODE_ENV === "development"

// rm -rf build && mkdir build && cp -r public/* build
execSync("npx rimraf build && mkdir build")
fs.cpSync("public", "build", { recursive: true })
// cp package.json build/package.json
fs.copyFileSync("package.json", "build/package.json")

// rm -rf package && mkdir package
execSync("npx rimraf package && mkdir package")
// mkdir package/win && mkdir package/linux && mkdir package/osx-intel
execSync("cd package && mkdir win && mkdir linux && mkdir osx-intel")

const banner = "/* eslint-disable linebreak-style */\n" +
    "/*\n" +
    figlet.textSync(pkg.name, { horizontalLayout: "full", font: "Big" }) +
    "\n" +
    `                                                                                v${pkg.version}\n\n\n` +
    `   ${pkg.description}\n\n` +
    `   Author: ${pkg.author}\n` +
    `   License: ${pkg.license}\n` +
    `   Repository: ${pkg.repository.url}\n\n` +
    `   Build date: ${new Date().toUTCString()}\n\n` +
    "   This program is free software: you can redistribute it and/or modify */\n\n"


const buildOptions = {
    entryPoints: ["src/index.tsx"],
    bundle: true,
    minify: dev ? false : true,
    sourcemap: true,
    color: true,
    outdir: "build/dist",
    target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
    platform: "node",
    loader: {
        ".js": "jsx",
        ".ts": "tsx",
        ".png": "dataurl",
    },
    jsx: "automatic",
    banner: {
        js: banner
    },
    plugins: [
        {
            name: "TypeScriptDeclarationsPlugin",
            setup(build) {
                build.onEnd(async (result) => {
                    if (result.errors.length > 0) {
                        console.log("\u001b[31mESM Build failed!\u001b[37m")
                        process.exit(1)
                    }
                    execSync("npx tsc --emitDeclarationOnly")
                    console.log("\u001b[36mTypeScript declarations generated!\u001b[37m")
                    // copy src/index.html to public/index.html
                    await nwbuild({
                        mode: "build",
                        version: "latest",
                        flavor: "normal",
                        platform: "win",
                        arch: "x64",
                        cacheDir: "./cache",
                        outDir: "./package/win",
                        srcDir: "./build",
                        cache: true,
                        ffmpeg: false,
                        glob: false,
                        /*app: {
                            name: pkg.name,
                            icon: "./src/icon192.png",
                            company: pkg.author,
                            fileDescription: pkg.description,
                            productName: pkg.name,
                            legalCopyright: pkg.author,
                        },*/
                    });
                    await nwbuild({
                        mode: "build",
                        version: "latest",
                        flavor: "normal",
                        platform: "linux",
                        arch: "x64",
                        cacheDir: "./cache",
                        outDir: "./package/linux",
                        srcDir: "./build",
                        cache: true,
                        ffmpeg: false,
                        glob: false,
                        /*app: {
                            name: pkg.name,
                            icon: "./src/icon192.png",
                            company: pkg.author,
                            fileDescription: pkg.description,
                            productName: pkg.name,
                            legalCopyright: pkg.author,
                        },*/
                    });
                    await nwbuild({
                        mode: "build",
                        version: "latest",
                        flavor: "normal",
                        platform: "osx",
                        arch: "x64",
                        cacheDir: "./cache",
                        outDir: "./package/osx-intel",
                        srcDir: "./build",
                        cache: true,
                        ffmpeg: false,
                        glob: false,
                        /*app: {
                            name: pkg.name,
                            icon: "./src/icon192.png",
                            company: pkg.author,
                            fileDescription: pkg.description,
                            productName: pkg.name,
                            legalCopyright: pkg.author,
                        },*/
                    });
                })
            }
        }
    ]
}

if (dev) {
    const ctx = await context(buildOptions)

    if (watch) await ctx.watch().then(() => {
        console.log("\u001b[36mWatching...\u001b[37m")
    })

    // Enable serve mode
    await ctx.serve({
        servedir: "build",
        port: 3000,
        onRequest: (args) => {
            if (args.path === "/") {
                args.path = "/index.html"
            }
            console.log(`\u001b[36m${args.method} ${args.path}\u001b[37m`)
        }
    }).then((server) => {
        console.log(`\u001b[36mServing at http://localhost:${server.port}\u001b[37m`)
        // Open browser
        switch (process.platform) {
            case "darwin":
                execSync(`open http://localhost:${server.port}`)
                break
            case "win32":
                execSync(`start http://localhost:${server.port}`)
                break
            default:
                execSync(`xdg-open http://localhost:${server.port}`)
        }
    })
} else {
    await build(buildOptions)
}

console.log("\u001b[36mESM Build succeeded!\u001b[37m")

// Enable watch mode
