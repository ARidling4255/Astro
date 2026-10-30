import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-IWHfIGH2.mjs";
import { t as GROK_PROVIDERS } from "./server-D3HfOoWS.mjs";
import { c as UserButton, d as useCurrentUserState, f as useDarkTheme, i as PlanetScene, n as NightSky, s as ThemeToggle, u as isGuestSession } from "./theme-toggle-NCsYjTe-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CE2Sx8K4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const dark = useDarkTheme();
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	async function submit(event) {
		event.preventDefault();
		if (pending) return;
		setError(null);
		const mail = email.trim();
		if (!mail.includes("@") || password.length < 8) {
			setError(password.length < 8 ? "Use at least 8 characters." : "Enter a real email.");
			return;
		}
		if (mode === "up" && name.trim().length < 2) {
			setError("Add the name you want on the account.");
			return;
		}
		setPending(true);
		const result = mode === "up" ? await authClient.signUp.email({
			name: name.trim(),
			email: mail,
			password,
			callbackURL: "/"
		}) : await authClient.signIn.email({
			email: mail,
			password,
			callbackURL: "/"
		});
		setPending(false);
		if (result.error) {
			setError(result.error.message ?? (mode === "up" ? "Could not create that account." : "Could not sign in."));
			return;
		}
		await navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden bg-paper text-ink",
		children: [dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NightSky, {}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 isolate mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pt-3 pb-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-end gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					"aria-label": "Back to today",
					className: "mt-6 inline-flex h-24 w-36",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanetScene, { className: "h-full w-full" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-xs font-semibold tracking-[0.22em] text-muted uppercase",
					children: "Account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-balance",
					children: "Welcome to Astro"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: "Create an account to keep your logs, weights, and goals with you."
				}),
				isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-40 animate-pulse rounded-3xl bg-track" }) : user && !isGuestSession(user) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 rounded-3xl border border-line bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-semibold",
							children: [
								"Signed in as ",
								user.displayName ?? user.primaryEmail ?? "you",
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Your history is on this account."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "capsule mt-4 inline-flex h-12 w-full items-center justify-center text-sm",
							children: "Back to today"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-2 rounded-2xl bg-just-soft p-1",
						children: [["in", "Sign in"], ["up", "Create"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setMode(id);
								setError(null);
							},
							className: mode === id ? "h-10 rounded-xl bg-card text-sm font-semibold" : "h-10 rounded-xl text-sm font-semibold text-muted",
							children: label
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "mt-4 space-y-3",
						children: [
							mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-[10px] font-semibold tracking-[0.16em] text-muted uppercase",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: name,
									onChange: (event) => setName(event.target.value),
									autoComplete: "name",
									className: "h-12 w-full rounded-full border border-line bg-card px-4 text-base outline-none"
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-[10px] font-semibold tracking-[0.16em] text-muted uppercase",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									value: email,
									onChange: (event) => setEmail(event.target.value),
									autoComplete: "email",
									className: "h-12 w-full rounded-full border border-line bg-card px-4 text-base outline-none"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-[10px] font-semibold tracking-[0.16em] text-muted uppercase",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: password,
									onChange: (event) => setPassword(event.target.value),
									autoComplete: mode === "up" ? "new-password" : "current-password",
									className: "h-12 w-full rounded-full border border-line bg-card px-4 text-base outline-none"
								})]
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-navy",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: pending || false,
								className: "capsule h-12 w-full text-sm disabled:opacity-40",
								children: pending ? "One moment" : mode === "up" ? "Create account" : "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-3",
						children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setError(null);
								signIn(provider.providerId, { callbackURL: "/" }).catch((err) => {
									setError(err instanceof Error ? err.message : "Could not sign in.");
								});
							},
							className: "capsule-quiet h-12 w-full text-sm",
							children: ["Continue with ", provider.label]
						}, provider.providerId))
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-8 text-center text-sm font-semibold text-muted",
					children: "Use Astro on this device only"
				})
			]
		})]
	});
}
//#endregion
export { LoginPage as component };
