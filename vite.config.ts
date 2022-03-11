import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		emptyOutDir: false,
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "obsx",
			formats: ["es", "cjs", "iife", "umd"],
			fileName: (format) => `obsx.${format}.js`,
		},
	},
});
