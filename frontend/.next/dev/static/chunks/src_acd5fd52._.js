(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/services/linkService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// 'use server'
__turbopack_context__.s([
    "checkCodeAvailablity",
    ()=>checkCodeAvailablity,
    "createLink",
    ()=>createLink,
    "getAllLinks",
    ()=>getAllLinks,
    "updateClick",
    ()=>updateClick
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
async function createLink(code, url) {
    const payload = {
        code: code,
        url: url
    };
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`http://localhost:3001/links/`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return {
            status: response.status.toString(),
            data: response.data
        };
    } catch (error) {
        return {
            status: error || "error",
            data: {
                data: "error"
            }
        };
    }
}
async function updateClick(code) {
    const payload = {
        code: code
    };
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`http://localhost:3001/links/`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return {
            done: "done"
        };
    } catch (error) {
        return {
            status: error || "error",
            data: {
                data: "error"
            }
        };
    }
}
async function checkCodeAvailablity(code) {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:3001/links/check/${code}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return {
            status: response.status.toString(),
            data: response.data
        };
    } catch (error) {
        return {
            status: error || "error",
            data: {
                data: "error"
            }
        };
    }
}
async function getAllLinks() {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:3001/links/`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return {
            status: response.status.toString(),
            data: response.data
        };
    } catch (error) {
        return {
            status: error || "error",
            data: {
                data: "error"
            }
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/go/[code]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShortLinkPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$linkService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/linkService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// Dummy function — replace with your DB/API
async function getDestination(shortCode) {
    const links = {
        "abc123": "https://google.com",
        "yt456": "https://youtube.com"
    };
    return links[shortCode] || null;
}
async function ShortLinkPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const code = params?.code;
    console.log("Shortcode --", code);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$linkService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateClick"])(code);
    if (!code) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-red-600 mt-20 text-center",
            children: "Invalid link"
        }, void 0, false, {
            fileName: "[project]/src/app/go/[code]/page.tsx",
            lineNumber: 24,
            columnNumber: 16
        }, this);
    }
    const destination = await getDestination(code);
    if (!destination) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-red-600 mt-20 text-center",
            children: "Link not found"
        }, void 0, false, {
            fileName: "[project]/src/app/go/[code]/page.tsx",
            lineNumber: 30,
            columnNumber: 16
        }, this);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["redirect"])(destination);
}
_s(ShortLinkPage, "+jVsTcECDRo3yq2d7EQxlN9Ixog=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = ShortLinkPage;
var _c;
__turbopack_context__.k.register(_c, "ShortLinkPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_acd5fd52._.js.map