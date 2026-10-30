import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as signOut, t as authClient } from "./client-IWHfIGH2.mjs";
import { a as hasGateSessionMarker } from "./server-D3HfOoWS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-toggle-NCsYjTe-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...parts) {
	return parts.filter(Boolean).join(" ");
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	return useSessionUserState();
}
function useSessionUserState() {
	const { data, isPending } = authClient.useSession();
	const id = data?.user.id;
	const displayName = data?.user.name ?? null;
	const primaryEmail = data?.user.email ?? null;
	const profileImageUrl = data?.user.image ?? null;
	const user = (0, import_react.useMemo)(() => id ? {
		id,
		displayName,
		primaryEmail,
		profileImageUrl,
		isDevFallback: false
	} : null, [
		id,
		displayName,
		primaryEmail,
		profileImageUrl
	]);
	return (0, import_react.useMemo)(() => ({
		user,
		isPending
	}), [user, isPending]);
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing$1 = () => () => {};
var noGateSessionOnServer$1 = () => false;
/**
* Render children only once we KNOW the visitor is signed out (`isPending` has
* cleared and there is no user). Hidden while the session is still loading.
*/
function SignedOut({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending || user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing$1, hasGateSessionMarker, noGateSessionOnServer$1);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/** The preview gate's unnamed fallback — not an account the person created. */
function isGuestSession(user) {
	const email = user.primaryEmail ?? "";
	return user.displayName === "Grok user" || email.endsWith("@viewer.grok.invalid");
}
function AuthCorner() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-11 w-24 animate-pulse rounded-full bg-track" });
	if (!user || isGuestSession(user)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: "capsule-quiet inline-flex h-11 items-center px-4 text-xs font-semibold",
		children: "Sign in"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedChip, {});
}
function SignedChip() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "You";
	const first = label.split(" ")[0] ?? label;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex h-11 items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			className: "capsule-quiet inline-flex h-11 max-w-36 items-center truncate px-4 text-xs",
			children: first
		}), !gateSession ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled: signingOut,
			onClick: () => {
				setSigningOut(true);
				signOut().catch(() => setSigningOut(false));
			},
			className: "text-[10px] font-semibold tracking-[0.14em] text-muted uppercase disabled:opacity-60",
			children: signingOut ? "…" : "Out"
		}) : null]
	});
}
function Starburst({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		className,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M32 2 36.2 25.2 60 32 36.2 38.8 32 62 27.8 38.8 4 32 27.8 25.2Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			opacity: "0.8",
			d: "M32 16 34 28.5 46 32 34 35.5 32 48 30 35.5 18 32 30 28.5Z",
			transform: "rotate(35 32 32)"
		})]
	});
}
function AtomOrbit({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 120 120",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "60",
				cy: "60",
				rx: "52",
				ry: "18",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "60",
				cy: "60",
				rx: "52",
				ry: "18",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.6",
				transform: "rotate(60 60 60)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "60",
				cy: "60",
				rx: "52",
				ry: "18",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.6",
				transform: "rotate(120 60 60)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "5",
				fill: "currentColor"
			})
		]
	});
}
function PlanetScene({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 180 140",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 36c22 4 38 16 48 32",
				fill: "none",
				stroke: "#087a88",
				strokeWidth: "8",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 36c22 4 38 16 48 32",
				fill: "none",
				stroke: "#f4c400",
				strokeWidth: "4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M14 30c16 8 30 16 42 30",
				fill: "none",
				stroke: "#d31270",
				strokeWidth: "2",
				strokeLinecap: "round",
				opacity: "0.85"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "62",
				cy: "72",
				r: "7",
				fill: "#d31270"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "62",
				cy: "72",
				r: "3",
				fill: "#ffffff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "118",
				cy: "78",
				r: "34",
				fill: "#087a88"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M90 66c10-16 36-22 52-10 4 16-8 28-24 30-16-6-28-8-28-20Z",
				fill: "#14b4c2",
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "118",
				cy: "78",
				rx: "58",
				ry: "14",
				fill: "none",
				stroke: "#087a88",
				strokeWidth: "7",
				transform: "rotate(-28 118 78)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "118",
				cy: "78",
				rx: "58",
				ry: "14",
				fill: "none",
				stroke: "#f4c400",
				strokeWidth: "3.5",
				transform: "rotate(-28 118 78)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "118",
				cy: "78",
				rx: "58",
				ry: "14",
				fill: "none",
				stroke: "#d31270",
				strokeWidth: "1.4",
				transform: "rotate(-28 118 78)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#f4c400",
				d: "M36 104 37.4 108.2 41.6 109.6 37.4 111 36 115.2 34.6 111 30.4 109.6 34.6 108.2Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#087a88",
				d: "M156 28 157 31.2 160.2 32.2 157 33.2 156 36.4 155 33.2 151.8 32.2 155 31.2Z"
			})
		]
	});
}
function OrbitDivider() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-8 flex items-center gap-3",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtomOrbit, { className: "size-8 text-orange" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" })
		]
	});
}
var STARS = Array.from({ length: 42 }, (_, index) => ({
	x: (index * 73 + 11) % 100,
	y: (index * 41 + 7) % 100,
	delay: `${index % 9 * .32}s`,
	size: index % 7 === 0 ? 3 : index % 3 === 0 ? 2 : 1.5,
	color: index % 11 === 0 ? "#ff4b96" : index % 5 === 0 ? "#f4c400" : "#f4f1e6"
}));
var BURSTS = [
	{
		x: 12,
		y: 18,
		color: "#f4c400"
	},
	{
		x: 78,
		y: 12,
		color: "#5ad4e2"
	},
	{
		x: 64,
		y: 70,
		color: "#ff4b96"
	},
	{
		x: 28,
		y: 84,
		color: "#f4c400"
	},
	{
		x: 88,
		y: 46,
		color: "#5ad4e2"
	}
];
function NightSky() {
	const [pass, setPass] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let cancelled = false;
		const timers = /* @__PURE__ */ new Set();
		const later = (fn, ms) => {
			const id = window.setTimeout(() => {
				timers.delete(id);
				if (!cancelled) fn();
			}, ms);
			timers.add(id);
		};
		const life = {
			rocket: 7400,
			shoot: 1500,
			alien: 11200,
			sputnik: 12e3
		};
		const order = [
			"sputnik",
			"rocket",
			"alien",
			"shoot"
		];
		let index = 0;
		const run = () => {
			const kind = order[index % order.length] ?? "sputnik";
			index += 1;
			setPass(kind);
			later(() => {
				setPass(null);
				later(run, 4500);
			}, life[kind]);
		};
		later(run, 900);
		return () => {
			cancelled = true;
			timers.forEach((id) => window.clearTimeout(id));
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-0 overflow-hidden",
		"aria-hidden": "true",
		children: [
			STARS.map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "star absolute rounded-full",
				style: {
					left: `${star.x}%`,
					top: `${star.y}%`,
					width: star.size,
					height: star.size,
					background: star.color,
					animationDelay: star.delay
				}
			}, `${star.x}-${star.y}`)),
			BURSTS.map((burst) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 16 16",
				className: "star absolute size-3",
				style: {
					left: `${burst.x}%`,
					top: `${burst.y}%`,
					color: burst.color
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					d: "M8 0 9.2 6.2 16 8 9.2 9.8 8 16 6.8 9.8 0 8 6.8 6.2Z"
				})
			}, `${burst.x}-${burst.y}`)),
			pass === "rocket" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartoonRocket, {}) : null,
			pass === "shoot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShootingStar, {}) : null,
			pass === "alien" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Saucer, {}) : null,
			pass === "sputnik" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sputnik, {}) : null
		]
	});
}
function CartoonRocket() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rocket-by absolute flex items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 78 32",
			className: "rocket-plume",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "plume-outer",
						x1: "0",
						x2: "1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0",
								stopColor: "#ff4b96",
								stopOpacity: "0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0.28",
								stopColor: "#ff3b78"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0.62",
								stopColor: "#ff6a1a"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "1",
								stopColor: "#ffd15a"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "plume-mid",
						x1: "0",
						x2: "1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0",
								stopColor: "#ff8a1a",
								stopOpacity: "0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0.35",
								stopColor: "#ffb000"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "1",
								stopColor: "#fff1a8"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "plume-core",
						x1: "0",
						x2: "1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0",
								stopColor: "#fff6c8",
								stopOpacity: "0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0.4",
								stopColor: "#fff6c8"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "1",
								stopColor: "#ffffff"
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					className: "tongue tongue-outer",
					fill: "url(#plume-outer)",
					d: "M76 16C58 6 34 2 8 16 34 30 58 26 76 16Z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					className: "tongue tongue-mid",
					fill: "url(#plume-mid)",
					d: "M76 16C60 10 42 8 24 16 42 24 60 22 76 16Z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					className: "tongue tongue-core",
					fill: "url(#plume-core)",
					d: "M76 16C64 13 50 13 38 16 50 19 64 19 76 16Z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "ember ember-a",
					cx: "70",
					cy: "16",
					r: "1.5",
					fill: "#ffe38a"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "ember ember-b",
					cx: "70",
					cy: "16",
					r: "1.15",
					fill: "#ff9a2a"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "ember ember-c",
					cx: "70",
					cy: "16",
					r: "1.3",
					fill: "#fff6d0"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/flybys/rocket.png",
			alt: "",
			draggable: false,
			className: "relative h-4 w-auto max-w-none -ml-3"
		})]
	});
}
function Saucer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "alien-by absolute",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/flybys/ufo.png",
			alt: "",
			draggable: false,
			className: "ufo-bob h-5 w-auto max-w-none"
		})
	});
}
function Sputnik() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sputnik-by absolute",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/flybys/sputnik.png",
			alt: "",
			draggable: false,
			className: "sputnik-wobble h-16 w-auto max-w-none"
		})
	});
}
function ShootingStar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 140 16",
		className: "shoot-by absolute h-3 w-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "streak",
				x1: "0",
				x2: "1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0",
						stopColor: "#f4c400",
						stopOpacity: "0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0.7",
						stopColor: "#f4c400"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "#ffffff"
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "0",
				y: "6",
				width: "124",
				height: "3",
				rx: "1.5",
				fill: "url(#streak)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "128",
				cy: "7.5",
				r: "3",
				fill: "#ffffff"
			})
		]
	});
}
var KEY = "heft-theme";
function paint(theme) {
	document.documentElement.dataset.theme = theme === "dark" ? "dark" : "";
	if (theme === "light") delete document.documentElement.dataset.theme;
	const meta = document.querySelector("meta[name=\"theme-color\"]");
	if (meta) meta.setAttribute("content", theme === "dark" ? "#070b16" : "#f7f6f3");
}
function ThemeToggle() {
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDark(document.documentElement.dataset.theme === "dark");
	}, []);
	function toggle() {
		const next = dark ? "light" : "dark";
		setDark(next === "dark");
		paint(next);
		try {
			localStorage.setItem(KEY, next);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			id: "theme-switch-label",
			className: "text-[10px] font-semibold tracking-[0.18em] text-muted uppercase",
			children: dark ? "Dark" : "Light"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "switch",
			"aria-checked": dark,
			"aria-labelledby": "theme-switch-label",
			onClick: toggle,
			className: cn("relative h-8 w-[3.25rem] shrink-0 rounded-full border-2 p-0.5 transition-colors", dark ? "border-[#5ad4e2] bg-[#070b16]" : "border-ink bg-paper"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block size-6 rounded-full transition-transform duration-200", dark ? "translate-x-5 bg-pop shadow-[0_0_8px_#f4c400]" : "translate-x-0 bg-coral") })
		})]
	});
}
function useDarkTheme() {
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const sync = () => setDark(document.documentElement.dataset.theme === "dark");
		sync();
		const observer = new MutationObserver(sync);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"]
		});
		return () => observer.disconnect();
	}, []);
	return dark;
}
//#endregion
export { SignedOut as a, UserButton as c, useCurrentUserState as d, useDarkTheme as f, PlanetScene as i, cn as l, NightSky as n, Starburst as o, OrbitDivider as r, ThemeToggle as s, AuthCorner as t, isGuestSession as u };
