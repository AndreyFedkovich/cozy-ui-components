import * as i from "react";
import on, { useMemo as qe, forwardRef as Ci, useState as B, useRef as ve, useEffect as ue, useCallback as Q, memo as sn, Children as xi, isValidElement as Ei, useLayoutEffect as Xn } from "react";
import { jsxs as N, jsx as u, Fragment as Je } from "react/jsx-runtime";
import * as ho from "react-dom";
import go, { createPortal as ki } from "react-dom";
const f0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 17, height: 17, viewBox: "0 0 17 17", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M0.5 8.50634L8.5 0.5L16.5 8.49975", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M2.5 6.58643V16.4994H14.5V6.56641", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M6.5 16.4998V10.5H10.5", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" })), p0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8.09237 4.75028C8.31363 4.75028 8.49345 4.92792 8.49345 5.1465V8.80763C8.49345 9.02622 8.31363 9.2032 8.09237 9.2032H5.6565C5.43524 9.2032 5.2561 9.02622 5.2561 8.80763C5.2561 8.58839 5.43524 8.41141 5.6565 8.41141H7.6913V5.1465C7.6913 4.92792 7.87111 4.75028 8.09237 4.75028ZM1 8C1 11.8599 4.17853 15 8.08502 15C11.4053 15 14.2442 12.7712 14.9895 9.58028C15.0397 9.36763 14.9047 9.155 14.6887 9.10547C14.4775 9.05859 14.2582 9.18933 14.2074 9.40264C13.547 12.2317 11.0296 14.2075 8.08502 14.2075C4.62038 14.2075 1.80149 11.4227 1.80149 8C1.80149 4.5766 4.62038 1.79245 8.08502 1.79245C10.5296 1.79245 12.7502 3.20962 13.7756 5.36839H11.3912C11.17 5.36839 10.9901 5.54537 10.9901 5.76396C10.9901 5.98254 11.17 6.16019 11.3912 6.16019H14.424C14.6453 6.16019 14.8244 5.98254 14.8244 5.76396V2.76849C14.8244 2.54991 14.6453 2.37226 14.424 2.37226C14.2028 2.37226 14.023 2.54991 14.023 2.76849V4.18236C12.7335 2.23226 10.5062 1 8.08502 1C4.17853 1 1 4.14009 1 8Z", fill: "currentColor" })), m0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("g", { clipPath: "url(#clip0_27648_5774)" }, /* @__PURE__ */ i.createElement("path", { d: "M8.24567 14.0242H0.666672V0.666992H6.60323L10.5609 4.6247V9.57183", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M6.60417 0.666992V4.6247H10.5619", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M12.638 12.54L13.8254 13.7405L15.0127 12.54", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M9.07781 12.5403L7.89047 11.3398L6.70312 12.5403", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M12.2564 15.1521C11.7 15.4559 11.0599 15.5703 10.4328 15.4781C9.80562 15.3859 9.22551 15.092 8.78019 14.6409C8.38611 14.2414 8.11251 13.7391 7.99061 13.1914C7.8687 12.6437 7.90348 12.0728 8.09094 11.5439", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M9.45833 9.9274C10.0147 9.62358 10.6548 9.50915 11.2819 9.60138C11.9091 9.69361 12.4892 9.9875 12.9345 10.4386C13.3288 10.8379 13.6028 11.34 13.7252 11.8877C13.8477 12.4353 13.8138 13.0063 13.6272 13.5355", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" })), /* @__PURE__ */ i.createElement("defs", null, /* @__PURE__ */ i.createElement("clipPath", { id: "clip0_27648_5774" }, /* @__PURE__ */ i.createElement("rect", { width: 16, height: 16, fill: "white" })))), h0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("g", { clipPath: "url(#clip0_27648_5680)" }, /* @__PURE__ */ i.createElement("path", { d: "M13.9999 6.31067V3.52381H5.79479V2H0.666595V12.2264C0.666595 12.3432 0.713287 12.4551 0.796637 12.5377C0.879986 12.6202 0.993098 12.6666 1.11097 12.6666H8.35888", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M14.2521 6L9.0879 11.1766L8 14L10.8358 12.9333L16 7.75667L14.2521 6Z", stroke: "currentColor", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M9.33339 11.333L10.6667 12.6663", stroke: "currentColor", strokeLinejoin: "round" })), /* @__PURE__ */ i.createElement("defs", null, /* @__PURE__ */ i.createElement("clipPath", { id: "clip0_27648_5680" }, /* @__PURE__ */ i.createElement("rect", { width: 16, height: 16, fill: "white" })))), g0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M5.05584 2.58008V5.33656C4.3465 5.33656 4.28125 6.22012 4.28125 6.4379C4.28125 6.65568 4.44608 7.68235 5.15853 7.68235C5.39614 8.66258 5.9937 9.51765 6.83242 10.0779", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M9.6302 10.0628C10.4691 9.50283 11.0666 8.64767 11.3039 7.66731C12.0102 7.66731 12.1751 6.65932 12.1751 6.43843C12.1751 6.21754 12.2964 5.34953 11.5933 5.33709V2.62109", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M6.37643 9.79102V10.4669C6.37643 10.9336 6.60665 11.6118 4.04309 12.1003C1.33332 12.6167 1.33333 14.6669 1.33333 14.6669H15.3333C15.3333 14.6669 15.3334 12.6603 12.4338 12.1003C9.94494 11.618 10.1005 10.9336 10.1005 10.4669V9.79102", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M4.59114 11.9824L8.32766 14.6673L12.061 12.0228", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M8.3282 3.00033L1.79167 1.60033L8.3282 0.666992L14.8615 1.60033L8.3282 3.00033Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M5.05725 3.93359L8.32711 4.40026L11.5938 3.93359", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M2.25781 1.69336V7.20001", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" })), v0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M6.9329 14H2V9.06713H6.9329V14Z", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M6.9329 6.60059H2V1.66765H6.9329V6.60059Z", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M14.3343 14H9.40144V9.06713H14.3343V14Z", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M14.3343 6.60059H9.40144V1.66765H14.3343V6.60059Z", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" })), w0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("g", { clipPath: "url(#clip0_27648_5733)" }, /* @__PURE__ */ i.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15.2984 6.64286C15.2984 10.7453 8.14844 15 8.14844 15C8.14844 15 0.998444 10.7453 0.998444 6.64286C0.998444 6.53654 0.998444 6.2315 0.998444 6.17857C0.998444 3.87061 2.7989 2 5.02032 2C6.28408 2 7.4111 2.60682 8.14755 3.55396C8.88489 2.60682 10.0124 2 11.2766 2C13.498 2 15.2984 3.87061 15.2984 6.17857C15.2984 6.23104 15.2984 6.53607 15.2984 6.64286Z", stroke: "currentColor" })), /* @__PURE__ */ i.createElement("defs", null, /* @__PURE__ */ i.createElement("clipPath", { id: "clip0_27648_5733" }, /* @__PURE__ */ i.createElement("rect", { width: 16, height: 16, fill: "white" })))), b0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("g", { clipPath: "url(#clip0_27648_5852)" }, /* @__PURE__ */ i.createElement("path", { d: "M4.81389 5.81154C4.79445 6.087 5.00199 6.32606 5.27745 6.3455C5.55291 6.36494 5.79197 6.1574 5.81141 5.88194L5.31265 5.84674L4.81389 5.81154ZM10.6346 4.74381L11.1154 4.6067V4.6067L10.6346 4.74381ZM8.27563 9.0822L7.96537 8.69011L8.27563 9.0822ZM7.09347 11.3614C7.09347 11.6376 7.31733 11.8614 7.59347 11.8614C7.86961 11.8614 8.09347 11.6376 8.09347 11.3614H7.59347H7.09347ZM5.31265 5.84674L5.81141 5.88194C5.90808 4.51228 6.8506 3.80991 7.87427 3.67837C8.94608 3.54065 9.91206 4.03342 10.1537 4.88092L10.6346 4.74381L11.1154 4.6067C10.6897 3.114 9.11102 2.51123 7.74682 2.68653C6.33448 2.868 4.94971 3.88719 4.81389 5.81154L5.31265 5.84674ZM10.6346 4.74381L10.1537 4.88092C10.2697 5.28772 10.347 5.69413 10.1318 6.24186C9.9049 6.81911 9.32895 7.61111 7.96537 8.69011L8.27563 9.0822L8.58589 9.47429C10.01 8.34742 10.7424 7.42216 11.0625 6.60764C11.3942 5.76361 11.2571 5.10376 11.1154 4.6067L10.6346 4.74381ZM8.27563 9.0822L7.96537 8.69011C7.0119 9.44458 7.09347 10.6137 7.09347 11.3614H7.59347H8.09347C8.09347 10.4547 8.08561 9.87017 8.58589 9.47429L8.27563 9.0822Z", fill: "currentColor" }), /* @__PURE__ */ i.createElement("circle", { cx: 7.66097, cy: 13.1607, r: 0.431202, fill: "currentColor" }), /* @__PURE__ */ i.createElement("path", { d: "M8.17085 15.3418C12.1312 15.3418 15.3418 12.1313 15.3418 8.17095C15.3418 4.21057 12.1312 1 8.17085 1C4.21047 1 1 4.21057 1 8.17095C1 12.1313 4.21047 15.3418 8.17085 15.3418Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })), /* @__PURE__ */ i.createElement("defs", null, /* @__PURE__ */ i.createElement("clipPath", { id: "clip0_27648_5852" }, /* @__PURE__ */ i.createElement("rect", { width: 16, height: 16, fill: "white" })))), _0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { fill: "none", d: "m38.46 11.54l-5.85-5.9a3.9 3.9 0 0 0-2.76-1.14h-19.5a2 2 0 0 0-1.95 2v35.1a2 2 0 0 0 1.95 2h27.3a2 2 0 0 0 2-2V14.3a3.9 3.9 0 0 0-1.19-2.76m-25.08 3.15H29.7m-16.32 7.03h21.24m-21.24 7.03h19.5m-19.5 7.03h12.68" })), y0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M5.26562 6.60009V3.33337C5.26562 2.71452 5.51145 2.12104 5.94904 1.68345C6.38663 1.24586 6.98015 1 7.599 1C8.21784 1 8.81132 1.24586 9.24891 1.68345C9.68651 2.12104 9.93237 2.71452 9.93237 3.33337V6.60009", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M13.2002 5.66699H2V15.0005H13.2002V5.66699Z", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" })), C0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("g", { clipPath: "url(#clip0_27648_5666)" }, /* @__PURE__ */ i.createElement("path", { d: "M12.3924 13.6144L11.0069 7.30241L13.701 4.60825C14.8557 3.45361 15.2406 1.91409 14.8557 1.14433C14.0859 0.75945 12.5464 1.14433 11.3918 2.29897L8.69759 4.99313L2.38557 3.60756C2.00069 3.53058 1.69278 3.68454 1.53883 3.99244L1.3079 4.37732C1.15395 4.7622 1.23093 5.14708 1.53883 5.37801L5.61856 8.07217L4.07904 10.3814H1.76976L1 11.1512L3.30928 12.6907L4.8488 15L5.61856 14.2302V11.921L7.92784 10.3814L10.622 14.4612C10.8529 14.7691 11.2378 14.846 11.6227 14.6921L12.0076 14.5381C12.3155 14.3072 12.4694 13.9993 12.3924 13.6144Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })), /* @__PURE__ */ i.createElement("defs", null, /* @__PURE__ */ i.createElement("clipPath", { id: "clip0_27648_5666" }, /* @__PURE__ */ i.createElement("rect", { width: 16, height: 16, fill: "white" })))), x0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("g", { clipPath: "url(#clip0_27648_5649)" }, /* @__PURE__ */ i.createElement("path", { d: "M11.7265 12.0262C9.54829 11.6097 9.54246 10.9341 9.54246 10.4973V9.8042C9.97361 9.38644 10.3133 8.88369 10.5399 8.32776C10.7665 7.77182 10.875 7.17487 10.8587 6.57475V4.478C10.8587 2.20657 9.24835 1.33301 7.80104 1.33301C6.35374 1.33301 4.74336 2.20657 4.74336 4.478V6.57475C4.72731 7.17345 4.83548 7.76895 5.06102 8.32378C5.28656 8.8786 5.62458 9.38067 6.0538 9.79837V10.4973C6.0538 10.9341 6.0538 11.6301 3.86974 12.0262C3.25845 12.135 2.69243 12.4205 2.24165 12.8475C1.79087 13.2744 1.4751 13.8241 1.33333 14.4286H14.2601C14.1154 13.826 13.7992 13.2783 13.3495 12.8519C12.8998 12.4254 12.336 12.1386 11.7265 12.0262V12.0262Z", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" })), /* @__PURE__ */ i.createElement("defs", null, /* @__PURE__ */ i.createElement("clipPath", { id: "clip0_27648_5649" }, /* @__PURE__ */ i.createElement("rect", { width: 16, height: 16, fill: "white" })))), E0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("g", { clipPath: "url(#clip0_27648_5794)" }, /* @__PURE__ */ i.createElement("path", { d: "M9.12936 11.9944H1.33333C1.33333 11.9944 1.33335 10.4405 3.42691 10.0372C5.22691 9.69028 5.22975 9.14763 5.22975 8.79178V8.43298C4.77582 8.01292 4.45171 7.47165 4.29568 6.87318V6.87318C3.74708 6.87318 3.6166 5.7463 3.6166 5.58024C3.6166 5.41417 3.59592 4.73811 4.15045 4.73811C3.79164 3.31472 3.85386 2.00989 4.83837 2.00989C7.21069 0.370026 10.3629 1.8765 9.20046 4.73811C9.75795 4.73811 9.74011 5.41121 9.74011 5.58024C9.74011 5.74926 9.61273 6.87318 9.06116 6.87318C8.90437 7.4744 8.57795 8.0179 8.12101 8.43892V8.79475C8.12101 9.03791 8.05281 9.51827 9.01063 9.86522", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M11.1147 13.3319C12.343 13.3319 13.3387 12.3361 13.3387 11.1078C13.3387 9.87953 12.343 8.88379 11.1147 8.88379C9.88636 8.88379 8.89062 9.87953 8.89062 11.1078C8.89062 12.3361 9.88636 13.3319 11.1147 13.3319Z", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M12.6849 12.6797L14.6718 14.6666", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" })), /* @__PURE__ */ i.createElement("defs", null, /* @__PURE__ */ i.createElement("clipPath", { id: "clip0_27648_5794" }, /* @__PURE__ */ i.createElement("rect", { width: 16, height: 16, fill: "white" })))), k0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("g", { clipPath: "url(#clip0_27648_5697)" }, /* @__PURE__ */ i.createElement("path", { d: "M11.4479 1.33301H13.3353V3.22339", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M2.66681 7.55537L6.66986 3.99973L9.33659 5.3331L13.3367 1.33301", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M12.4479 14.6664V5.77734H14.2257V14.6664", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M8.89062 14.6662V10.2246H10.6684V14.6662", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M5.33333 14.6665V8.8916H7.11411V14.6665", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M1.77864 14.6667V12.0029H3.55646V14.6667", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M14.6699 14.667H1.33333", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })), /* @__PURE__ */ i.createElement("defs", null, /* @__PURE__ */ i.createElement("clipPath", { id: "clip0_27648_5697" }, /* @__PURE__ */ i.createElement("rect", { width: 16, height: 16, fill: "white" })))), S0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M4.93759 11.5H1.65C1.47761 11.5 1.31233 11.4285 1.19043 11.3012C1.06853 11.1739 1 11.0014 1 10.8214V2.67857C1 2.4986 1.06853 2.32598 1.19043 2.19873C1.31233 2.07147 1.47761 2 1.65 2H13.35C13.5224 2 13.6877 2.07147 13.8096 2.19873C13.9315 2.32598 14 2.4986 14 2.67857", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M13.9996 10.5448C14.0057 10.7866 13.9466 11.0252 13.8291 11.2326C13.7117 11.44 13.5407 11.6076 13.3365 11.7156L5.60035 14.9065C4.93136 15.2187 4.71622 14.6817 4.71622 14.2821V6.32045C4.70283 6.07729 4.75896 5.83551 4.87725 5.62665C4.99553 5.41778 5.17049 5.25154 5.37932 5.14963L12.8827 2.05555C13.3748 1.86822 13.9967 2.18353 13.9967 2.57068L13.9996 10.5448Z", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M7.5 10.5C8.01283 10.5 8.42857 10.0523 8.42857 9.5C8.42857 8.94772 8.01283 8.5 7.5 8.5C6.98716 8.5 6.57143 8.94772 6.57143 9.5C6.57143 10.0523 6.98716 10.5 7.5 10.5Z", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M3.32143 4.5H7.96428", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M3.32143 7H4.71428", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" })), N0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", width: 24, height: 24, fill: "currentColor", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M472 96h-88V40h-32v56H160V40h-32v56H40a24.03 24.03 0 0 0-24 24v336a24.03 24.03 0 0 0 24 24h432a24.03 24.03 0 0 0 24-24V120a24.03 24.03 0 0 0-24-24m-8 352H48V128h80v40h32v-40h192v40h32v-40h80Z" }), /* @__PURE__ */ i.createElement("path", { d: "M112 224h32v32h-32zm88 0h32v32h-32zm80 0h32v32h-32zm88 0h32v32h-32zm-256 72h32v32h-32zm88 0h32v32h-32zm80 0h32v32h-32zm88 0h32v32h-32zm-256 72h32v32h-32zm88 0h32v32h-32zm80 0h32v32h-32zm88 0h32v32h-32z" })), R0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", width: 24, height: 24, fill: "currentColor", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M8 7.5A1.5 1.5 0 0 1 9.5 6h12A1.5 1.5 0 0 1 23 7.5v3a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 8 10.5zm2 .5v2h11V8zM4 5.25A3.25 3.25 0 0 1 7.25 2h16.5A3.25 3.25 0 0 1 27 5.25v21.5A3.25 3.25 0 0 1 23.75 30H7.25A3.25 3.25 0 0 1 4 26.75zM7.25 4C6.56 4 6 4.56 6 5.25v21.5c0 .69.56 1.25 1.25 1.25h16.5c.69 0 1.25-.56 1.25-1.25V5.25C25 4.56 24.44 4 23.75 4zm22 4H28v4h1.25a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 0-.75-.75M28 14h1.25a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75H28zm1.25 6H28v4h1.25a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 0-.75-.75" })), L0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024", width: 24, height: 24, fill: "currentColor", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 0 0-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 0 0-11.3 0L266.3 586.7a8.03 8.03 0 0 0 0 11.3z" })), A0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", width: 24, height: 24, fill: "currentColor", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M9.5 1A1.5 1.5 0 0 0 8 2.5v2a1.5 1.5 0 0 0 1 1.414V7a.5.5 0 0 0 .82.384L11.48 6h2.02A1.5 1.5 0 0 0 15 4.5v-2A1.5 1.5 0 0 0 13.5 1zM9 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2.2a.5.5 0 0 0-.32.116l-.98.816V5.5a.5.5 0 0 0-.5-.5a.5.5 0 0 1-.5-.5zM3 6a2 2 0 1 1 4 0a2 2 0 0 1-4 0m2-1a1 1 0 1 0 0 2a1 1 0 0 0 0-2M2.5 9h5A1.5 1.5 0 0 1 9 10.5c0 1.116-.459 2.01-1.212 2.615C7.047 13.71 6.053 14 5 14s-2.047-.29-2.788-.885C1.46 12.51 1 11.616 1 10.5A1.5 1.5 0 0 1 2.5 9m5 1h-5a.5.5 0 0 0-.5.5c0 .817.325 1.423.838 1.835C3.364 12.757 4.12 13 5 13s1.636-.243 2.162-.665C7.675 11.923 8 11.317 8 10.5a.5.5 0 0 0-.5-.5" })), P0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 2048 2048", width: 24, height: 24, fill: "currentColor", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M1536 640h-512V512h512zm-512 384h512v128h-512zm131 896l128 128H256V0h1536v1283l-128 128V128H384v1792zM941 429L704 666L531 493l90-90l83 83l147-147zm0 512l-237 237l-173-173l90-90l83 83l147-147zm-237 569l147-147l90 90l-237 237l-173-173l90-90zm1325-57l-557 558l-269-270l90-90l179 178l467-466z" })), M0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", width: 24, height: 24, fill: "currentColor", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M20.039 4.751a1 1 0 0 0 1.922.551l.827-2.884a1 1 0 1 0-1.922-.55zm8.668-1.458a1 1 0 0 1 0 1.414l-3 3a1 1 0 1 1-1.414-1.414l3-3a1 1 0 0 1 1.414 0M26 11.002a1 1 0 0 1 1-1h3a1 1 0 0 1 0 2h-3a1 1 0 0 1-1-1M11.956 5.659a3 3 0 0 1 4.805-.78l10.36 10.36a3 3 0 0 1-.78 4.804l-4.749 2.375a5.5 5.5 0 0 1-9.813 4.906l-2.717 1.359A3 3 0 0 1 5.6 28.12L3.88 26.4a3 3 0 0 1-.562-3.463zm1.62 20.767a3.5 3.5 0 0 0 6.218-3.109zm1.77-20.133a1 1 0 0 0-1.6.26l-8.64 17.279a1 1 0 0 0 .187 1.154l1.72 1.72a1 1 0 0 0 1.155.188l17.279-8.64a1 1 0 0 0 .26-1.601z" })), O0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 19, height: 19, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { fill: "none", d: "M17 17a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5m0 0a4.5 4.5 0 0 1 4.5 4.5M17 17a4.5 4.5 0 0 0-4.5 4.5M7 7.5a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5m0 0a4.5 4.5 0 0 1 4.5 4.5M7 7.5A4.5 4.5 0 0 0 2.5 12m1 3.5c0 2.764 2.236 5 5 5l-.5-2m10.5-10c0-2.764-2.236-5-5-5l.5 2" })), I0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024", width: 24, height: 24, fill: "currentColor", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M296 256c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm192 200v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8m-48 396H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8m104.1-115.6c1.8-34.5 16.2-66.8 40.8-91.4c26.2-26.2 62-41 99.1-41c37.4 0 72.6 14.6 99.1 41c3.2 3.2 6.3 6.6 9.2 10.1L769.2 673a8 8 0 0 0 3 14.1l93.3 22.5c5 1.2 9.8-2.6 9.9-7.7l.6-95.4a8 8 0 0 0-12.9-6.4l-20.3 15.8C805.4 569.6 748.1 540 684 540c-109.9 0-199.6 86.9-204 195.7c-.2 4.5 3.5 8.3 8 8.3h48.1c4.3 0 7.8-3.3 8-7.6M880 744h-48.1c-4.3 0-7.8 3.3-8 7.6c-1.8 34.5-16.2 66.8-40.8 91.4c-26.2 26.2-62 41-99.1 41c-37.4 0-72.6-14.6-99.1-41c-3.2-3.2-6.3-6.6-9.2-10.1l23.1-17.9a8 8 0 0 0-3-14.1l-93.3-22.5c-5-1.2-9.8 2.6-9.9 7.7l-.6 95.4a8 8 0 0 0 12.9 6.4l20.3-15.8C562.6 918.4 619.9 948 684 948c109.9 0 199.6-86.9 204-195.7c.2-4.5-3.5-8.3-8-8.3" })), T0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024", width: 24, height: 24, fill: "currentColor", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M573 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40m-280 0c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40" }), /* @__PURE__ */ i.createElement("path", { d: "M894 345c-48.1-66-115.3-110.1-189-130v.1c-17.1-19-36.4-36.5-58-52.1c-163.7-119-393.5-82.7-513 81c-96.3 133-92.2 311.9 6 439l.8 132.6c0 3.2.5 6.4 1.5 9.4c5.3 16.9 23.3 26.2 40.1 20.9L309 806c33.5 11.9 68.1 18.7 102.5 20.6l-.5.4c89.1 64.9 205.9 84.4 313 49l127.1 41.4c3.2 1 6.5 1.6 9.9 1.6c17.7 0 32-14.3 32-32V753c88.1-119.6 90.4-284.9 1-408M323 735l-12-5l-99 31l-1-104l-8-9c-84.6-103.2-90.2-251.9-11-361c96.4-132.2 281.2-161.4 413-66c132.2 96.1 161.5 280.6 66 412c-80.1 109.9-223.5 150.5-348 102m505-17l-8 10l1 104l-98-33l-12 5c-56 20.8-115.7 22.5-171 7l-.2-.1C613.7 788.2 680.7 742.2 729 676c76.4-105.3 88.8-237.6 44.4-350.4l.6.4c23 16.5 44.1 37.1 62 62c72.6 99.6 68.5 235.2-8 330" }), /* @__PURE__ */ i.createElement("path", { d: "M433 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40" })), Kn = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M6.5433 12.0867C9.6048 12.0867 12.0867 9.60488 12.0867 6.54338C12.0867 3.48188 9.6048 1 6.5433 1C3.4818 1 1 3.48188 1 6.54338C1 9.60488 3.4818 12.0867 6.5433 12.0867Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M10.4727 10.4707L15.9994 16.0007", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })), D0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M19 12.5H6M19 12.5L14.3333 8M19 12.5L14.3333 17", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })), Qn = (e) => /* @__PURE__ */ i.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3285 17.0857 11.7189 17.0989 11.3243 16.7372L5.32428 11.2372C4.91716 10.864 4.88965 10.2314 5.26285 9.82427C5.63604 9.41715 6.26861 9.38965 6.67573 9.76284L11.9699 14.6159L17.2929 9.29289Z", fill: "currentColor" })), $0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3285 17.0857 11.7189 17.0989 11.3243 16.7372L5.32428 11.2372C4.91716 10.864 4.88965 10.2314 5.26285 9.82427C5.63604 9.41715 6.26861 9.38965 6.67573 9.76284L11.9699 14.6159L17.2929 9.29289Z", fill: "rgba(0, 109, 240, 0.8)" })), dt = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M13 3L8 8M3 13L8 8M8 8L3 3L13 13", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })), F0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("rect", { width: 24, height: 24, rx: 12, fill: "#FFEEEE" }), /* @__PURE__ */ i.createElement("path", { d: "M7.5 7.5L16.5 16.5M7.5 16.5L16.5 7.5", stroke: "#D72D40", strokeWidth: 1.4, strokeLinecap: "round" })), B0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("rect", { width: 24, height: 24, rx: 12, fill: "#E0F4F0" }), /* @__PURE__ */ i.createElement("path", { d: "M9.89997 17C9.7143 17 9.53632 16.9248 9.40507 16.7909L5.20502 12.505C4.93166 12.226 4.93166 11.7739 5.20502 11.495C5.47837 11.216 5.92165 11.216 6.19483 11.495L9.89997 15.2757L17.8052 7.2092C18.0785 6.93027 18.5218 6.93027 18.795 7.2092C19.0683 7.48813 19.0683 7.94045 18.795 8.21939L10.3949 16.7909C10.2636 16.9248 10.0857 17 9.89997 17Z", fill: "#00A582" })), z0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("rect", { width: 24, height: 24, rx: 12, fill: "#E0F1FF" }), /* @__PURE__ */ i.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12.1056 8.28604C12.3584 8.28604 12.5639 8.48905 12.5639 8.73886V12.923C12.5639 13.1728 12.3584 13.3751 12.1056 13.3751H9.32172C9.06885 13.3751 8.86411 13.1728 8.86411 12.923C8.86411 12.6724 9.06885 12.4702 9.32172 12.4702H11.6472V8.73886C11.6472 8.48905 11.8527 8.28604 12.1056 8.28604ZM4 12C4 16.4113 7.63261 20 12.0972 20C15.8917 20 19.1362 17.4528 19.988 13.806C20.0453 13.563 19.891 13.32 19.6443 13.2634C19.4029 13.2098 19.1523 13.3592 19.0942 13.603C18.3394 16.8362 15.4624 19.0943 12.0972 19.0943C8.13758 19.0943 4.91599 15.9117 4.91599 12C4.91599 8.08754 8.13758 4.90566 12.0972 4.90566C14.8909 4.90566 17.4288 6.52528 18.6007 8.99245H15.8757C15.6228 8.99245 15.4173 9.19471 15.4173 9.44452C15.4173 9.69433 15.6228 9.89736 15.8757 9.89736H19.3418C19.5946 9.89736 19.7994 9.69433 19.7994 9.44452V6.02113C19.7994 5.77132 19.5946 5.5683 19.3418 5.5683C19.0889 5.5683 18.8834 5.77132 18.8834 6.02113V7.63698C17.4097 5.4083 14.8642 4 12.0972 4C7.63261 4 4 7.58867 4 12Z", fill: "#4573D9" })), vo = (e) => /* @__PURE__ */ i.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M21.9006 11.9999C21.9006 6.53258 17.4684 2.10042 12.0011 2.10042C6.53372 2.10042 2.10156 6.53258 2.10156 11.9999C2.10156 17.4673 6.53372 21.8994 12.0011 21.8994C17.4684 21.8994 21.9006 17.4673 21.9006 11.9999Z", fill: "#00A582", stroke: "#00A582", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M8 11.6226L10.8813 15L16 9", stroke: "white", strokeWidth: 1.5, strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" })), j0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z", fill: "#D72D40", stroke: "#D72D40", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M15.6912 8.31348L8.30859 15.6917", stroke: "white", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M15.6947 15.6917L8.31641 8.31348", stroke: "white", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" })), Si = (e) => /* @__PURE__ */ i.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M11.8617 21.7234C17.3082 21.7234 21.7234 17.3082 21.7234 11.8617C21.7234 6.41523 17.3082 2 11.8617 2C6.41523 2 2 6.41523 2 11.8617C2 17.3082 6.41523 21.7234 11.8617 21.7234Z", fill: "#FFA300", stroke: "#FFA300", strokeWidth: 1.5, strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M11.3004 13.9799L11.0046 6.75096C11.0001 6.63834 11.0178 6.52593 11.0567 6.42017C11.0957 6.3144 11.155 6.21731 11.2315 6.1345C11.3079 6.05168 11.3999 5.98475 11.5022 5.93749C11.6046 5.89023 11.7152 5.86359 11.8278 5.85908C11.9404 5.85458 12.0528 5.87228 12.1586 5.91122C12.2644 5.95015 12.3614 6.00959 12.4442 6.08603C12.527 6.16248 12.594 6.25442 12.6413 6.35673C12.6885 6.45905 12.7152 6.56967 12.7197 6.68229C12.7197 6.70373 12.7197 6.72952 12.7197 6.75096L12.4238 13.9799C12.4238 14.1295 12.3644 14.2729 12.2587 14.3787C12.1529 14.4844 12.0095 14.5438 11.86 14.5438C11.7104 14.5438 11.567 14.4844 11.4613 14.3787C11.3555 14.2729 11.2961 14.1295 11.2961 13.9799H11.3004Z", fill: "white" }), /* @__PURE__ */ i.createElement("circle", { cx: 11.8605, cy: 16.7795, r: 1, fill: "white", stroke: "white", strokeWidth: 0.572616 })), H0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M15 3H1V13H15V3Z", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M1 3L8 10.3433L15 3", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M10.3359 7.89648L15.0026 12.9998", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("path", { d: "M1 12.9998L5.66667 7.89648", stroke: "currentColor", strokeMiterlimit: 10, strokeLinecap: "round", strokeLinejoin: "round" })), V0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M1.61422 14.1333L5.99625 12.4418C6.61289 12.5773 7.2432 12.6457 7.87554 12.6458C11.6739 12.6458 14.7511 10.2623 14.7511 7.32292C14.7511 4.38348 11.6739 2 7.87554 2C4.07718 2 1 4.38348 1 7.32292C1 8.81925 1.79758 10.1707 3.08101 11.1347L1.61422 14.1333Z", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" }), /* @__PURE__ */ i.createElement("circle", { cx: 4.98438, cy: 7.66211, r: 0.75, fill: "currentColor" }), /* @__PURE__ */ i.createElement("circle", { cx: 7.875, cy: 7.66211, r: 0.75, fill: "currentColor" }), /* @__PURE__ */ i.createElement("circle", { cx: 10.7656, cy: 7.66211, r: 0.75, fill: "currentColor" })), W0 = (e) => /* @__PURE__ */ i.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M11.5195 9.99817C11.3265 9.87759 11.0947 9.83572 10.8717 9.88121C10.6488 9.92671 10.4519 10.0561 10.3216 10.2426C9.89136 10.7756 9.35845 11.663 7.34409 9.64859C5.32972 7.63423 6.2171 7.1013 6.74759 6.67105C6.93413 6.54079 7.0635 6.34385 7.109 6.12093C7.15449 5.89801 7.11263 5.66612 6.99205 5.47319C6.84537 5.25073 5.90909 3.80596 5.74285 3.56639C5.57662 3.32681 5.35414 2.93568 4.84077 3.00901C4.31202 3.17497 3.84929 3.50384 3.51868 3.9486C3.18807 4.39337 3.00653 4.93127 3 5.48541C3 7.13308 4.29808 9.15233 6.07287 10.9271C7.84766 12.7019 9.86692 14 11.5146 14C12.0687 13.9935 12.6066 13.8119 13.0514 13.4813C13.4962 13.1507 13.825 12.688 13.991 12.1592C14.0643 11.6434 13.6732 11.4258 13.4336 11.2571C13.194 11.0885 11.7419 10.1448 11.5195 9.99817Z", stroke: "currentColor", strokeMiterlimit: 10, strokeLinejoin: "round" })), q0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", width: 24, height: 24, fill: "currentColor", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M29 26H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h6.46l1.71-2.55A1 1 0 0 1 12 4h8a1 1 0 0 1 .83.45L22.54 7H29a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1M4 24h24V9h-6a1 1 0 0 1-.83-.45L19.46 6h-6.92l-1.71 2.55A1 1 0 0 1 10 9H4Z" }), /* @__PURE__ */ i.createElement("path", { d: "M16 22a6 6 0 1 1 6-6a6 6 0 0 1-6 6m0-10a4 4 0 1 0 4 4a4 4 0 0 0-4-4" })), Ni = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 24, height: 24, fill: "#000000", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1 1 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1zM5.002 8L5 20h10V8zM9 6h8v10h2V4H9z" })), Ri = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { fill: "none", d: "M12 11v5m0 5a9 9 0 1 1 0-18a9 9 0 0 1 0 18m.05-13v.1h-.1V8z" })), G0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", width: 24, height: 24, fill: "currentColor", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M18 28h-4a2 2 0 0 1-2-2v-7.59L4.59 11A2 2 0 0 1 4 9.59V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v3.59a2 2 0 0 1-.59 1.41L20 18.41V26a2 2 0 0 1-2 2M6 6v3.59l8 8V26h4v-8.41l8-8V6Z" })), U0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024", width: 24, height: 24, fill: "currentColor", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9m67.4-174.4L687.8 215l73.3 73.3l-362.7 362.6l-88.9 15.7zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32" })), Z0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 24, height: 24, fill: "currentColor", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M20.3 13.43a1 1 0 0 0-1.25.65A7.14 7.14 0 0 1 12.18 19A7.1 7.1 0 0 1 5 12a7.1 7.1 0 0 1 7.18-7a7.26 7.26 0 0 1 4.65 1.67l-2.17-.36a1 1 0 0 0-1.15.83a1 1 0 0 0 .83 1.15l4.24.7h.17a1 1 0 0 0 .34-.06a.3.3 0 0 0 .1-.06a.8.8 0 0 0 .2-.11l.09-.11c0-.05.09-.09.13-.15s0-.1.05-.14a1.3 1.3 0 0 0 .07-.18l.75-4a1 1 0 0 0-2-.38l-.27 1.45A9.2 9.2 0 0 0 12.18 3A9.1 9.1 0 0 0 3 12a9.1 9.1 0 0 0 9.18 9A9.12 9.12 0 0 0 21 14.68a1 1 0 0 0-.7-1.25" })), Y0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024", width: 24, height: 24, fill: "currentColor", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64m176.5 585.7l-28.6 39a7.99 7.99 0 0 1-11.2 1.7L483.3 569.8a7.92 7.92 0 0 1-3.3-6.5V288c0-4.4 3.6-8 8-8h48.1c4.4 0 8 3.6 8 8v247.5l142.6 103.1c3.6 2.5 4.4 7.5 1.8 11.1" })), Li = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { fill: "none", d: "M4.5 11.5a3 3 0 0 1 3-3h8.718a4 4 0 0 1 2.325.745l4.914 3.51a4 4 0 0 0 2.325.745H40.5a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3h-33a3 3 0 0 1-3-3z" }), /* @__PURE__ */ i.createElement("circle", { cx: 25.435, cy: 25.065, r: 5.565 }), /* @__PURE__ */ i.createElement("path", { d: "M21.5 29L17 33.5" })), X0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M19 3v4m0 14V11m-7-8v12m0 6v-2M5 3v2m0 16V9" }), /* @__PURE__ */ i.createElement("circle", { cx: 19, cy: 9, r: 2, transform: "rotate(90 19 9)" }), /* @__PURE__ */ i.createElement("circle", { cx: 12, cy: 17, r: 2, transform: "rotate(90 12 17)" }), /* @__PURE__ */ i.createElement("circle", { cx: 5, cy: 7, r: 2, transform: "rotate(90 5 7)" })), K0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 12 12", width: 24, height: 24, fill: "#000000", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M6.84 2.189a1.96 1.96 0 0 0-1.68 0L.286 4.498A.5.5 0 0 0 0 4.976v3.026a.5.5 0 1 0 1 0V5.756l1 .496v2.75a.5.5 0 0 0 .147.354l.025.024l.06.055q.075.072.217.188c.187.153.457.355.794.558c.67.401 1.634.82 2.757.82s2.088-.419 2.757-.82a6.7 6.7 0 0 0 1.012-.746l.06-.055l.023-.024h.002A.5.5 0 0 0 10 9.001v-2.75l1.722-.854a.5.5 0 0 0-.008-.9zm.032 5.615L9 6.748V8.78l-.082.07a6 6 0 0 1-.675.473c-.58.348-1.366.679-2.243.679s-1.662-.33-2.243-.679A6 6 0 0 1 3 8.78V6.748l2.128 1.056c.55.272 1.194.272 1.744 0m-.46-4.711l3.942 1.867l-3.927 1.948a.96.96 0 0 1-.854 0L1.646 4.96l3.942-1.867a.96.96 0 0 1 .824 0M2.149 9.358" })), Q0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 2048 2048", width: 24, height: 24, fill: "currentColor", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { d: "M1728 1664q26 0 45 19t19 45t-19 45t-45 19H960q-26 0-45-19t-19-45t19-45t45-19zm-128 256q26 0 45 19t19 45t-19 45t-45 19h-512q-26 0-45-19t-19-45t19-45t45-19zm238-512h210v128H537q-10 64-14 128t-7 127t-3 128t-1 129H128v-193q0-81 6-160t17-159H0v-128h172q50-245 151-471t250-427q-146-5-268-61T82 289l-45-46l47-44q104-97 228-147T579 1q156 0 286 58t239 168q77 2 149 24t134 60t113 90t87 115t57 135t20 150v64h-64q-132 0-247-56t-199-159q-76 138-191 227t-269 125q-43 99-76 200t-57 206h289q22-84 69-154t112-122t146-79t167-29q87 0 167 28t145 80t113 121t69 155M1238 380q-6 65-26 132q51 88 134 146t185 74q-10-61-35-115t-63-101t-88-80t-107-56m-126 7q-102 8-192 50T759 547T642 704t-61 189q85-7 161-36t139-78t112-112t81-144q14-33 23-67t15-69M224 247q80 66 177 101t201 35q97 0 187-30t168-88q-80-66-177-101t-201-35q-97 0-187 30t-168 88m318 775q-8 2-16 2t-16 0h-32q-16 0-32-2v-47q-53 118-89 232t-59 230t-32 235t-10 248h128q0-121 8-234t27-223t49-219t74-222m442 386h720q-20-57-56-104t-83-81t-104-52t-117-19q-61 0-117 18t-103 52t-84 81t-56 105" })), J0 = (e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", style: {
  opacity: 1
}, ...e }, /* @__PURE__ */ i.createElement("path", { fill: "none", d: "M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.877a2 2 0 0 0 1.94-1.515L22 17" }));
var Ai = /* @__PURE__ */ ((e) => (e.BLUE_01 = "#D3E8FA", e.BLUE_02 = "#4573D9", e.BLUE_03 = "#4573D9", e.BLUE_04 = "#4573D9", e.BLUE_05 = "#001A3D", e.GRAY_01 = "#F4F7FA", e.GRAY_02 = "#c8c7cc", e.GRAY_03 = "#808080", e.GRAY_04 = "#525252", e.GRAY_05 = "#2A2A2A", e.GRAY_06 = "#AEBFDE", e.GRAY_07 = "#DDE5F5", e.WHITE_01 = "#FFFFFF", e.BLACK_01 = "#000000", e.GREEN_01 = "#C4F2E8", e.GREEN_02 = "#00A582", e.ORANGE_01 = "#F9E1D7", e.ORANGE_02 = "#FF6B2C", e.RED_01 = "#FFEEEE", e.RED_02 = "#D72D40", e.YELLOW_01 = "#FFF1D8", e.YELLOW_02 = "#FFA300", e))(Ai || {});
function Pi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var En = { exports: {} };
var Er;
function Mi() {
  return Er || (Er = 1, (function(e) {
    (function() {
      var t = {}.hasOwnProperty;
      function n() {
        for (var s = "", a = 0; a < arguments.length; a++) {
          var c = arguments[a];
          c && (s = o(s, r(c)));
        }
        return s;
      }
      function r(s) {
        if (typeof s == "string" || typeof s == "number")
          return s;
        if (typeof s != "object")
          return "";
        if (Array.isArray(s))
          return n.apply(null, s);
        if (s.toString !== Object.prototype.toString && !s.toString.toString().includes("[native code]"))
          return s.toString();
        var a = "";
        for (var c in s)
          t.call(s, c) && s[c] && (a = o(a, c));
        return a;
      }
      function o(s, a) {
        return a ? s ? s + " " + a : s + a : s;
      }
      e.exports ? (n.default = n, e.exports = n) : window.classNames = n;
    })();
  })(En)), En.exports;
}
var Oi = Mi();
const M = /* @__PURE__ */ Pi(Oi), Ii = "_block_rajx_1", Ti = "_subtitle_rajx_6", Di = "_title_rajx_13", kn = {
  block: Ii,
  subtitle: Ti,
  title: Di
}, eh = ({ id: e, title: t, subtitle: n, children: r, className: o }) => /* @__PURE__ */ N("div", { className: M(kn.block, o), id: e, children: [
  t && typeof t == "string" ? /* @__PURE__ */ u("div", { className: kn.title, children: t }) : t,
  n && /* @__PURE__ */ u("div", { className: kn.subtitle, children: n }),
  r
] });
function kr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Pt(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = kr(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : kr(e[o], null);
        }
      };
  };
}
function Se(...e) {
  return i.useCallback(Pt(...e), e);
}
var $i = /* @__PURE__ */ Symbol.for("react.lazy"), Kt = i[" use ".trim().toString()];
function Fi(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function wo(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === $i && "_payload" in e && Fi(e._payload);
}
// @__NO_SIDE_EFFECTS__
function bo(e) {
  const t = /* @__PURE__ */ zi(e), n = i.forwardRef((r, o) => {
    let { children: s, ...a } = r;
    wo(s) && typeof Kt == "function" && (s = Kt(s._payload));
    const c = i.Children.toArray(s), l = c.find(Hi);
    if (l) {
      const d = l.props.children, f = c.map((m) => m === l ? i.Children.count(d) > 1 ? i.Children.only(null) : i.isValidElement(d) ? d.props.children : null : m);
      return /* @__PURE__ */ u(t, { ...a, ref: o, children: i.isValidElement(d) ? i.cloneElement(d, void 0, f) : null });
    }
    return /* @__PURE__ */ u(t, { ...a, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Bi = /* @__PURE__ */ bo("Slot");
// @__NO_SIDE_EFFECTS__
function zi(e) {
  const t = i.forwardRef((n, r) => {
    let { children: o, ...s } = n;
    if (wo(o) && typeof Kt == "function" && (o = Kt(o._payload)), i.isValidElement(o)) {
      const a = Wi(o), c = Vi(s, o.props);
      return o.type !== i.Fragment && (c.ref = r ? Pt(r, a) : a), i.cloneElement(o, c);
    }
    return i.Children.count(o) > 1 ? i.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var ji = /* @__PURE__ */ Symbol("radix.slottable");
function Hi(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ji;
}
function Vi(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...c) => {
      const l = s(...c);
      return o(...c), l;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Wi(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function _o(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = _o(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function yo() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = _o(e)) && (r && (r += " "), r += t);
  return r;
}
const Sr = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Nr = yo, Co = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return Nr(e, n?.class, n?.className);
  const { variants: o, defaultVariants: s } = t, a = Object.keys(o).map((d) => {
    const f = n?.[d], m = s?.[d];
    if (f === null) return null;
    const h = Sr(f) || Sr(m);
    return o[d][h];
  }), c = n && Object.entries(n).reduce((d, f) => {
    let [m, h] = f;
    return h === void 0 || (d[m] = h), d;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((d, f) => {
    let { class: m, className: h, ...p } = f;
    return Object.entries(p).every((w) => {
      let [g, v] = w;
      return Array.isArray(v) ? v.includes({
        ...s,
        ...c
      }[g]) : {
        ...s,
        ...c
      }[g] === v;
    }) ? [
      ...d,
      m,
      h
    ] : d;
  }, []);
  return Nr(e, a, l, n?.class, n?.className);
}, qi = (e, t) => {
  const n = new Array(e.length + t.length);
  for (let r = 0; r < e.length; r++)
    n[r] = e[r];
  for (let r = 0; r < t.length; r++)
    n[e.length + r] = t[r];
  return n;
}, Gi = (e, t) => ({
  classGroupId: e,
  validator: t
}), xo = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
  nextPart: e,
  validators: t,
  classGroupId: n
}), Qt = "-", Rr = [], Ui = "arbitrary..", Zi = (e) => {
  const t = Xi(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      if (a.startsWith("[") && a.endsWith("]"))
        return Yi(a);
      const c = a.split(Qt), l = c[0] === "" && c.length > 1 ? 1 : 0;
      return Eo(c, l, t);
    },
    getConflictingClassGroupIds: (a, c) => {
      if (c) {
        const l = r[a], d = n[a];
        return l ? d ? qi(d, l) : l : d || Rr;
      }
      return n[a] || Rr;
    }
  };
}, Eo = (e, t, n) => {
  if (e.length - t === 0)
    return n.classGroupId;
  const o = e[t], s = n.nextPart.get(o);
  if (s) {
    const d = Eo(e, t + 1, s);
    if (d) return d;
  }
  const a = n.validators;
  if (a === null)
    return;
  const c = t === 0 ? e.join(Qt) : e.slice(t).join(Qt), l = a.length;
  for (let d = 0; d < l; d++) {
    const f = a[d];
    if (f.validator(c))
      return f.classGroupId;
  }
}, Yi = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
  return r ? Ui + r : void 0;
})(), Xi = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e;
  return Ki(n, t);
}, Ki = (e, t) => {
  const n = xo();
  for (const r in e) {
    const o = e[r];
    Jn(o, n, r, t);
  }
  return n;
}, Jn = (e, t, n, r) => {
  const o = e.length;
  for (let s = 0; s < o; s++) {
    const a = e[s];
    Qi(a, t, n, r);
  }
}, Qi = (e, t, n, r) => {
  if (typeof e == "string") {
    Ji(e, t, n);
    return;
  }
  if (typeof e == "function") {
    ea(e, t, n, r);
    return;
  }
  ta(e, t, n, r);
}, Ji = (e, t, n) => {
  const r = e === "" ? t : ko(t, e);
  r.classGroupId = n;
}, ea = (e, t, n, r) => {
  if (na(e)) {
    Jn(e(r), t, n, r);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(Gi(n, e));
}, ta = (e, t, n, r) => {
  const o = Object.entries(e), s = o.length;
  for (let a = 0; a < s; a++) {
    const [c, l] = o[a];
    Jn(l, ko(t, c), n, r);
  }
}, ko = (e, t) => {
  let n = e;
  const r = t.split(Qt), o = r.length;
  for (let s = 0; s < o; s++) {
    const a = r[s];
    let c = n.nextPart.get(a);
    c || (c = xo(), n.nextPart.set(a, c)), n = c;
  }
  return n;
}, na = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, ra = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  const o = (s, a) => {
    n[s] = a, t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(s) {
      let a = n[s];
      if (a !== void 0)
        return a;
      if ((a = r[s]) !== void 0)
        return o(s, a), a;
    },
    set(s, a) {
      s in n ? n[s] = a : o(s, a);
    }
  };
}, zn = "!", Lr = ":", oa = [], Ar = (e, t, n, r, o) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: n,
  maybePostfixModifierPosition: r,
  isExternal: o
}), sa = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const s = [];
    let a = 0, c = 0, l = 0, d;
    const f = o.length;
    for (let g = 0; g < f; g++) {
      const v = o[g];
      if (a === 0 && c === 0) {
        if (v === Lr) {
          s.push(o.slice(l, g)), l = g + 1;
          continue;
        }
        if (v === "/") {
          d = g;
          continue;
        }
      }
      v === "[" ? a++ : v === "]" ? a-- : v === "(" ? c++ : v === ")" && c--;
    }
    const m = s.length === 0 ? o : o.slice(l);
    let h = m, p = !1;
    m.endsWith(zn) ? (h = m.slice(0, -1), p = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      m.startsWith(zn) && (h = m.slice(1), p = !0)
    );
    const w = d && d > l ? d - l : void 0;
    return Ar(s, p, h, w);
  };
  if (t) {
    const o = t + Lr, s = r;
    r = (a) => a.startsWith(o) ? s(a.slice(o.length)) : Ar(oa, !1, a, void 0, !0);
  }
  if (n) {
    const o = r;
    r = (s) => n({
      className: s,
      parseClassName: o
    });
  }
  return r;
}, ia = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((n, r) => {
    t.set(n, 1e6 + r);
  }), (n) => {
    const r = [];
    let o = [];
    for (let s = 0; s < n.length; s++) {
      const a = n[s], c = a[0] === "[", l = t.has(a);
      c || l ? (o.length > 0 && (o.sort(), r.push(...o), o = []), r.push(a)) : o.push(a);
    }
    return o.length > 0 && (o.sort(), r.push(...o)), r;
  };
}, aa = (e) => ({
  cache: ra(e.cacheSize),
  parseClassName: sa(e),
  sortModifiers: ia(e),
  ...Zi(e)
}), ca = /\s+/, la = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t, a = [], c = e.trim().split(ca);
  let l = "";
  for (let d = c.length - 1; d >= 0; d -= 1) {
    const f = c[d], {
      isExternal: m,
      modifiers: h,
      hasImportantModifier: p,
      baseClassName: w,
      maybePostfixModifierPosition: g
    } = n(f);
    if (m) {
      l = f + (l.length > 0 ? " " + l : l);
      continue;
    }
    let v = !!g, b = r(v ? w.substring(0, g) : w);
    if (!b) {
      if (!v) {
        l = f + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (b = r(w), !b) {
        l = f + (l.length > 0 ? " " + l : l);
        continue;
      }
      v = !1;
    }
    const y = h.length === 0 ? "" : h.length === 1 ? h[0] : s(h).join(":"), _ = p ? y + zn : y, C = _ + b;
    if (a.indexOf(C) > -1)
      continue;
    a.push(C);
    const E = o(b, v);
    for (let x = 0; x < E.length; ++x) {
      const S = E[x];
      a.push(_ + S);
    }
    l = f + (l.length > 0 ? " " + l : l);
  }
  return l;
}, da = (...e) => {
  let t = 0, n, r, o = "";
  for (; t < e.length; )
    (n = e[t++]) && (r = So(n)) && (o && (o += " "), o += r);
  return o;
}, So = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = So(e[r])) && (n && (n += " "), n += t);
  return n;
}, ua = (e, ...t) => {
  let n, r, o, s;
  const a = (l) => {
    const d = t.reduce((f, m) => m(f), e());
    return n = aa(d), r = n.cache.get, o = n.cache.set, s = c, c(l);
  }, c = (l) => {
    const d = r(l);
    if (d)
      return d;
    const f = la(l, n);
    return o(l, f), f;
  };
  return s = a, (...l) => s(da(...l));
}, fa = [], ie = (e) => {
  const t = (n) => n[e] || fa;
  return t.isThemeGetter = !0, t;
}, No = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ro = /^\((?:(\w[\w-]*):)?(.+)\)$/i, pa = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, ma = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ha = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ga = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, va = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, wa = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ze = (e) => pa.test(e), z = (e) => !!e && !Number.isNaN(Number(e)), Ye = (e) => !!e && Number.isInteger(Number(e)), Sn = (e) => e.endsWith("%") && z(e.slice(0, -1)), je = (e) => ma.test(e), Lo = () => !0, ba = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  ha.test(e) && !ga.test(e)
), er = () => !1, _a = (e) => va.test(e), ya = (e) => wa.test(e), Ca = (e) => !L(e) && !A(e), xa = (e) => rt(e, Mo, er), L = (e) => No.test(e), ct = (e) => rt(e, Oo, ba), Pr = (e) => rt(e, Pa, z), Ea = (e) => rt(e, To, Lo), ka = (e) => rt(e, Io, er), Mr = (e) => rt(e, Ao, er), Sa = (e) => rt(e, Po, ya), Tt = (e) => rt(e, Do, _a), A = (e) => Ro.test(e), Nt = (e) => pt(e, Oo), Na = (e) => pt(e, Io), Or = (e) => pt(e, Ao), Ra = (e) => pt(e, Mo), La = (e) => pt(e, Po), Dt = (e) => pt(e, Do, !0), Aa = (e) => pt(e, To, !0), rt = (e, t, n) => {
  const r = No.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, pt = (e, t, n = !1) => {
  const r = Ro.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, Ao = (e) => e === "position" || e === "percentage", Po = (e) => e === "image" || e === "url", Mo = (e) => e === "length" || e === "size" || e === "bg-size", Oo = (e) => e === "length", Pa = (e) => e === "number", Io = (e) => e === "family-name", To = (e) => e === "number" || e === "weight", Do = (e) => e === "shadow", Ma = () => {
  const e = ie("color"), t = ie("font"), n = ie("text"), r = ie("font-weight"), o = ie("tracking"), s = ie("leading"), a = ie("breakpoint"), c = ie("container"), l = ie("spacing"), d = ie("radius"), f = ie("shadow"), m = ie("inset-shadow"), h = ie("text-shadow"), p = ie("drop-shadow"), w = ie("blur"), g = ie("perspective"), v = ie("aspect"), b = ie("ease"), y = ie("animate"), _ = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], C = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], E = () => [...C(), A, L], x = () => ["auto", "hidden", "clip", "visible", "scroll"], S = () => ["auto", "contain", "none"], k = () => [A, L, l], I = () => [Ze, "full", "auto", ...k()], $ = () => [Ye, "none", "subgrid", A, L], j = () => ["auto", {
    span: ["full", Ye, A, L]
  }, Ye, A, L], W = () => [Ye, "auto", A, L], H = () => ["auto", "min", "max", "fr", A, L], V = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], X = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], F = () => ["auto", ...k()], q = () => [Ze, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...k()], P = () => [Ze, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...k()], K = () => [Ze, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...k()], R = () => [e, A, L], fe = () => [...C(), Or, Mr, {
    position: [A, L]
  }], pe = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], oe = () => ["auto", "cover", "contain", Ra, xa, {
    size: [A, L]
  }], ce = () => [Sn, Nt, ct], G = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    A,
    L
  ], te = () => ["", z, Nt, ct], me = () => ["solid", "dashed", "dotted", "double"], D = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Y = () => [z, Sn, Or, Mr], Ce = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    w,
    A,
    L
  ], Re = () => ["none", z, A, L], Ne = () => ["none", z, A, L], U = () => [z, A, L], se = () => [Ze, "full", ...k()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [je],
      breakpoint: [je],
      color: [Lo],
      container: [je],
      "drop-shadow": [je],
      ease: ["in", "out", "in-out"],
      font: [Ca],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [je],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [je],
      shadow: [je],
      spacing: ["px", z],
      text: [je],
      "text-shadow": [je],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", Ze, L, A, v]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [z, L, A, c]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": _()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": _()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: E()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: x()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": x()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": x()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: S()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": S()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": S()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: I()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": I()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": I()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": I(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: I()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": I(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: I()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": I()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": I()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: I()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: I()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: I()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: I()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Ye, "auto", A, L]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Ze, "full", "auto", c, ...k()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [z, Ze, "auto", "initial", "none", L]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", z, A, L]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", z, A, L]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Ye, "first", "last", "none", A, L]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": $()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: j()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": W()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": W()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": $()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: j()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": W()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": W()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": H()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": H()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: k()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": k()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": k()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...V(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...X(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...X()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...V()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...X(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...X(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": V()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...X(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...X()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: k()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: k()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: k()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: k()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: k()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: k()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: k()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: k()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: k()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: k()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: k()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: F()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: F()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: F()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: F()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: F()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: F()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: F()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: F()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: F()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: F()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: F()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": k()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": k()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: q()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...P()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...P()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...P()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...K()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...K()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...K()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [c, "screen", ...q()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          c,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...q()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          c,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [a]
          },
          ...q()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...q()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...q()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...q()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, Nt, ct]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [r, Aa, Ea]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Sn, L]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Na, ka, t]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [L]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [o, A, L]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [z, "none", A, Pr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...k()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", A, L]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", A, L]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: R()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: R()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...me(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [z, "from-font", "auto", A, ct]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: R()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [z, "auto", A, L]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: k()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", A, L]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", A, L]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: fe()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: pe()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: oe()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Ye, A, L],
          radial: ["", A, L],
          conic: [Ye, A, L]
        }, La, Sa]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: R()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: ce()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: ce()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: ce()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: R()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: R()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: R()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: G()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": G()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": G()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": G()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": G()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": G()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": G()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": G()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": G()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": G()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": G()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": G()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": G()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": G()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": G()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: te()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": te()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": te()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": te()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": te()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": te()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": te()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": te()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": te()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": te()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": te()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": te()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": te()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...me(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...me(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: R()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": R()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": R()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": R()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": R()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": R()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": R()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": R()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": R()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": R()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": R()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: R()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...me(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [z, A, L]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", z, Nt, ct]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: R()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          f,
          Dt,
          Tt
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: R()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", m, Dt, Tt]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": R()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: te()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: R()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [z, ct]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": R()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": te()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": R()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", h, Dt, Tt]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": R()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [z, A, L]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...D(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": D()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [z]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": Y()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Y()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": R()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": R()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Y()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Y()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": R()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": R()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Y()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Y()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": R()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": R()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Y()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Y()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": R()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": R()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Y()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Y()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": R()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": R()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Y()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Y()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": R()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": R()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Y()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Y()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": R()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": R()
      }],
      "mask-image-radial": [{
        "mask-radial": [A, L]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": Y()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": Y()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": R()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": R()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": C()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [z]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": Y()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Y()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": R()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": R()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: fe()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: pe()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: oe()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", A, L]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          A,
          L
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Ce()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [z, A, L]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [z, A, L]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          p,
          Dt,
          Tt
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": R()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", z, A, L]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [z, A, L]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", z, A, L]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [z, A, L]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", z, A, L]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          A,
          L
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Ce()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [z, A, L]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [z, A, L]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", z, A, L]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [z, A, L]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", z, A, L]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [z, A, L]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [z, A, L]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", z, A, L]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": k()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": k()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": k()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", A, L]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [z, "initial", A, L]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", b, A, L]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [z, A, L]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", y, A, L]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [g, A, L]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": E()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: Re()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Re()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Re()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Re()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: Ne()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": Ne()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": Ne()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": Ne()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: U()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": U()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": U()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [A, L, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: E()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: se()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": se()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": se()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": se()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: R()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: R()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", A, L]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": k()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": k()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": k()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": k()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": k()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": k()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": k()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": k()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": k()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": k()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": k()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": k()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": k()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": k()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": k()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": k()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": k()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": k()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": k()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": k()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": k()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": k()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", A, L]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...R()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [z, Nt, ct, Pr]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...R()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Oa = /* @__PURE__ */ ua(Ma);
function De(...e) {
  return Oa(yo(e));
}
const Ia = Co(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), tr = i.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, s) => /* @__PURE__ */ u(r ? Bi : "button", { className: De(Ia({ variant: t, size: n, className: e })), ref: s, ...o })
);
tr.displayName = "Button";
const Ta = "_cssloadSpeedingWheel_akex8_6", Da = "_bigSize_akex8_20", $a = "_smallSize_akex8_26", Fa = "_extraSmallSize_akex8_32", $t = {
  cssloadSpeedingWheel: Ta,
  bigSize: Da,
  smallSize: $a,
  extraSmallSize: Fa
}, wt = ({
  marginTop: e,
  marginBottom: t,
  marginLeft: n,
  className: r,
  size: o = "big"
}) => {
  const s = qe(
    () => ({
      marginTop: e,
      marginBottom: t,
      marginLeft: n
    }),
    [t, n, e]
  );
  return /* @__PURE__ */ u("div", { className: r, style: s, children: /* @__PURE__ */ u(
    "div",
    {
      className: M($t.cssloadSpeedingWheel, {
        [$t.bigSize]: o === "big",
        [$t.smallSize]: o === "small",
        [$t.extraSmallSize]: o === "extraSmall"
      })
    }
  ) });
}, Ba = "_button_14x56_1", za = "_button__loader_14x56_186", ja = "_button__content_14x56_193", mt = {
  button: Ba,
  "button--variant-primary": "_button--variant-primary_14x56_26",
  "button--variant-primary--disabled": "_button--variant-primary--disabled_14x56_37",
  "button--variant-default": "_button--variant-default_14x56_45",
  "button--variant-default--disabled": "_button--variant-default--disabled_14x56_58",
  "button--variant-secondary": "_button--variant-secondary_14x56_66",
  "button--variant-secondary--disabled": "_button--variant-secondary--disabled_14x56_81",
  "button--variant-text": "_button--variant-text_14x56_89",
  "button--variant-text--disabled": "_button--variant-text--disabled_14x56_105",
  "button--variant-link": "_button--variant-link_14x56_113",
  "button--variant-link--disabled": "_button--variant-link--disabled_14x56_129",
  "button--variant-danger": "_button--variant-danger_14x56_137",
  "button--variant-danger--disabled": "_button--variant-danger--disabled_14x56_147",
  "button--size-small": "_button--size-small_14x56_155",
  "button--size-medium": "_button--size-medium_14x56_163",
  "button--size-large": "_button--size-large_14x56_171",
  "button--loading": "_button--loading_14x56_182",
  button__loader: za,
  button__content: ja
}, he = Ci(
  ({
    variant: e = "default",
    size: t = "medium",
    className: n = "",
    loading: r = !1,
    disabled: o = !1,
    children: s,
    type: a = "button",
    ...c
  }, l) => {
    const d = M(
      mt.button,
      mt[`button--variant-${e}`],
      mt[`button--size-${t}`],
      {
        [mt["button--loading"]]: r,
        [mt["button--disabled"]]: o
      },
      n
    );
    return /* @__PURE__ */ N(
      tr,
      {
        ref: l,
        variant: null,
        size: null,
        className: d,
        disabled: o || r,
        type: a,
        ...c,
        children: [
          s && s,
          r && /* @__PURE__ */ u("span", { className: mt.button__loader, children: /* @__PURE__ */ u(wt, { size: "extraSmall" }) })
        ]
      }
    );
  }
);
he.displayName = "Button";
const Ha = (e) => {
  const [t, n] = B(0), [r, o] = B(0), s = ve(null);
  return ue(() => {
    if (!e)
      return;
    const c = new ResizeObserver((d) => {
      s.current && cancelAnimationFrame(s.current), s.current = requestAnimationFrame(() => {
        for (const f of d)
          if (f.borderBoxSize) {
            const m = Array.isArray(f.borderBoxSize) ? f.borderBoxSize[0] : f.borderBoxSize;
            n(m.blockSize), o(m.inlineSize);
          } else
            n(f.contentRect.height), o(f.contentRect.width);
      });
    });
    c.observe(e);
    const l = e.getBoundingClientRect().height;
    return n(l), () => {
      c.disconnect();
    };
  }, [e, n]), qe(
    () => ({
      height: t,
      width: r
    }),
    [t, r]
  );
}, Ir = { capture: !0, passive: !0 }, th = ({
  triggerRef: e,
  dropdownHeight: t,
  offset: n = 8,
  enabled: r = !0,
  onAnchorFrame: o
}) => {
  const [s, a] = B("bottom"), c = ve(null), l = Q(() => {
    if (!e.current)
      return "bottom";
    const f = e.current.getBoundingClientRect(), m = window.innerHeight, h = f.top - n;
    return m - f.bottom - n >= t ? "bottom" : h >= t ? "top" : "bottom";
  }, [e, t, n]), d = Q(() => {
    c.current && cancelAnimationFrame(c.current), c.current = requestAnimationFrame(() => {
      const f = l();
      a(f), o?.(f);
    });
  }, [l, o]);
  return ue(() => {
    if (!r)
      return;
    const f = e.current;
    if (!f)
      return;
    d();
    const m = new ResizeObserver(() => {
      d();
    });
    m.observe(f);
    const h = new MutationObserver(() => {
      d();
    });
    h.observe(document.body, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeFilter: ["style", "class"]
    });
    const p = [];
    let w = f.parentElement;
    for (; w; ) {
      const g = window.getComputedStyle(w), v = g.overflow + g.overflowY + g.overflowX;
      /(auto|scroll)/.test(v) && (p.push(w), w.addEventListener("scroll", d)), w = w.parentElement;
    }
    return window.addEventListener("scroll", d, Ir), window.addEventListener("resize", d), window.addEventListener("transitionend", d), window.addEventListener("animationend", d), () => {
      c.current && cancelAnimationFrame(c.current), m.disconnect(), h.disconnect(), window.removeEventListener("scroll", d, Ir), window.removeEventListener("resize", d), window.removeEventListener("transitionend", d), window.removeEventListener("animationend", d), p.forEach((g) => {
        g.removeEventListener("scroll", d);
      });
    };
  }, [r, e, d]), s;
}, Va = "_container_db1u5_1", Wa = "_activeButton_db1u5_16", qa = "_slider_db1u5_22", Nn = {
  container: Va,
  activeButton: Wa,
  slider: qa
}, nh = ({
  data: e,
  activeButton: t,
  defaultActiveButton: n,
  onChange: r
}) => {
  const [o, s] = B(n || e[0]?.id), [a, c] = B({ transform: "translateX(0)", width: 0 }), l = ve(/* @__PURE__ */ new Map()), d = t || o, { width: f } = Ha(
    l.current.get(d)
  ), m = (p) => {
    p.id !== d && (r?.(p.id), s(p.id));
  }, h = Q((p, w) => {
    l.current.set(w, p);
  }, []);
  return ue(() => {
    const p = e.findIndex((w) => w.id === d);
    if (p >= 0) {
      const g = e.slice(0, p).reduce((v, b) => {
        const y = l.current.get(b.id);
        if (y) {
          const _ = y.getBoundingClientRect().width;
          v += _;
        }
        return v;
      }, 0);
      c({ transform: `translateX(${g}px)`, width: f });
    }
  }, [d, f, e]), /* @__PURE__ */ N("div", { className: Nn.container, children: [
    e.map((p) => /* @__PURE__ */ u("div", { ref: (w) => h(w, p.id), children: /* @__PURE__ */ N(
      he,
      {
        size: "small",
        onClick: () => m(p),
        className: M({ [Nn.activeButton]: p.id === d }),
        children: [
          p.label,
          p.additionalComponent
        ]
      }
    ) }, p.id)),
    /* @__PURE__ */ u("div", { className: Nn.slider, style: a })
  ] });
}, Ga = "_card_o236w_1", Ua = "_link_o236w_17", Tr = {
  card: Ga,
  link: Ua
}, rh = sn(
  ({ text: e, width: t, height: n, className: r, backgroundColor: o, imageUrl: s, textColor: a, link: c }) => {
    const l = M(Tr.card, { [Tr.link]: c }, r), d = qe(
      () => ({
        backgroundColor: o,
        ...a && { color: a },
        ...t && { width: t },
        ...n && { height: `${n}px` },
        ...s && { backgroundImage: `url(${s})` }
      }),
      [o, n, s, a, t]
    );
    return c ? /* @__PURE__ */ u("a", { className: l, style: d, href: c, children: /* @__PURE__ */ u("span", { children: e }) }) : /* @__PURE__ */ u("div", { className: l, style: d, children: /* @__PURE__ */ u("span", { children: e }) });
  }
), Za = "_carouselWrapper_hjngo_1", Ya = "_carousel_hjngo_1", Xa = "_viewport_hjngo_13", Ka = "_slide_hjngo_19", Qa = "_activeSlide_hjngo_24", Ja = "_itemContent_hjngo_28", ec = "_controls_hjngo_36", tc = "_carouselControl_hjngo_48", nc = "_prevIcon_hjngo_71", rc = "_nextIcon_hjngo_72", oc = "_indicators_hjngo_90", sc = "_activeIndicator_hjngo_115", ye = {
  carouselWrapper: Za,
  carousel: Ya,
  viewport: Xa,
  slide: Ka,
  activeSlide: Qa,
  itemContent: Ja,
  controls: ec,
  carouselControl: tc,
  prevIcon: nc,
  nextIcon: rc,
  indicators: oc,
  activeIndicator: sc
}, ic = (e) => "items" in e && Array.isArray(e.items) && "renderItem" in e && typeof e.renderItem == "function", ac = (e) => ic(e) ? e.items.map((t, n) => ({
  key: `${t.id}-${n}`,
  content: e.renderItem(t),
  caption: t.caption
})) : xi.toArray(e.children).map((t, n) => ({
  key: Ei(t) && t.key !== null && t.key !== void 0 && t.key !== "." ? String(t.key) : `slide-${n}`,
  content: t
})), cc = (e) => {
  const t = { ...e };
  return delete t.items, delete t.renderItem, delete t.children, t;
}, oh = (e) => {
  const t = ac(e), n = t.length, r = cc(e), {
    className: o,
    dark: s,
    enableTouch: a,
    fade: c,
    interval: l,
    keyboard: d = !0,
    pause: f,
    ride: m,
    slide: h,
    ...p
  } = r, [w, g] = B(0), v = () => {
    g((x) => x === n - 1 ? 0 : x + 1);
  }, b = () => {
    g((x) => x === 0 ? n - 1 : x - 1);
  }, y = (x) => {
    g(x);
  }, _ = n > 1, C = qe(() => t.map((x) => ({ key: x.key })), [t]), E = (x) => {
    p.onKeyDown?.(x), !(x.defaultPrevented || !d || !_) && (x.key === "ArrowLeft" && b(), x.key === "ArrowRight" && v());
  };
  return n ? _ ? /* @__PURE__ */ u("div", { className: ye.carouselWrapper, children: /* @__PURE__ */ N(
    "div",
    {
      ...p,
      className: [ye.carousel, o].filter(Boolean).join(" "),
      onKeyDown: E,
      role: "region",
      "aria-roledescription": "carousel",
      children: [
        /* @__PURE__ */ u("div", { className: ye.viewport, children: t.map((x, S) => /* @__PURE__ */ u(
          "div",
          {
            className: [ye.slide, S === w ? ye.activeSlide : ""].filter(Boolean).join(" "),
            "aria-hidden": S !== w,
            children: /* @__PURE__ */ u("div", { className: ye.itemContent, children: x.content })
          },
          x.key
        )) }),
        /* @__PURE__ */ N("div", { className: ye.controls, children: [
          /* @__PURE__ */ u(
            "button",
            {
              className: ye.carouselControl,
              type: "button",
              onClick: b,
              "aria-label": "Previous slide",
              children: /* @__PURE__ */ u("span", { className: ye.prevIcon, "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ u("div", { className: ye.indicators, children: C.map((x, S) => /* @__PURE__ */ u(
            "button",
            {
              className: S === w ? ye.activeIndicator : void 0,
              type: "button",
              onClick: () => y(S),
              "aria-label": `Go to slide ${S + 1}`,
              "aria-current": S === w
            },
            x.key
          )) }),
          /* @__PURE__ */ u(
            "button",
            {
              className: ye.carouselControl,
              type: "button",
              onClick: v,
              "aria-label": "Next slide",
              children: /* @__PURE__ */ u("span", { className: ye.nextIcon, "aria-hidden": "true" })
            }
          )
        ] })
      ]
    }
  ) }) : /* @__PURE__ */ u("div", { className: ye.carouselWrapper, children: t[0].content }) : null;
}, xe = 8;
function lc(e, t = "top") {
  const { left: n, right: r, top: o, bottom: s, width: a, height: c } = e, l = n + a / 2, d = o + c / 2;
  switch (t) {
    case "top":
      return { left: l, top: o - xe, transform: "translate(-50%, -100%)" };
    case "topLeft":
      return { left: n, top: o - xe, transform: "translateY(-100%)" };
    case "topRight":
      return { left: r, top: o - xe, transform: "translate(-100%, -100%)" };
    case "bottom":
      return { left: l, top: s + xe, transform: "translate(-50%, 0)" };
    case "bottomLeft":
      return { left: n, top: s + xe, transform: "translateY(0)" };
    case "bottomRight":
      return { left: r, top: s + xe, transform: "translate(-100%, 0)" };
    case "left":
      return { left: n - xe, top: d, transform: "translate(-100%, -50%)" };
    case "leftTop":
      return { left: n - xe, top: o, transform: "translate(-100%, 0)" };
    case "leftBottom":
      return { left: n - xe, top: s, transform: "translate(-100%, -100%)" };
    case "right":
      return { left: r + xe, top: d, transform: "translate(0, -50%)" };
    case "rightTop":
      return { left: r + xe, top: o, transform: "translate(0, 0)" };
    case "rightBottom":
      return { left: r + xe, top: s, transform: "translate(0, -100%)" };
    default:
      return { left: l, top: o - xe, transform: "translate(-50%, -100%)" };
  }
}
const dc = "_overlay_1xs4r_1", uc = "_fadeIn_1xs4r_1", fc = "_arrow_1xs4r_16", pc = "_top_1xs4r_22", mc = "_bottom_1xs4r_28", hc = "_left_1xs4r_34", gc = "_right_1xs4r_40", Rn = {
  overlay: dc,
  fadeIn: uc,
  arrow: fc,
  top: pc,
  bottom: mc,
  left: hc,
  right: gc
};
function vc(e) {
  return e.startsWith("top") ? "bottom" : e.startsWith("bottom") ? "top" : e.startsWith("left") ? "right" : e.startsWith("right") ? "left" : "top";
}
const $o = sn(
  ({
    title: e,
    open: t,
    defaultOpen: n = !1,
    trigger: r = "hover",
    mouseEnterDelay: o = 100,
    mouseLeaveDelay: s = 100,
    onOpenChange: a,
    placement: c = "top",
    arrow: l = !0,
    children: d,
    overlayClassName: f,
    getPopupContainer: m = () => document.body
  }) => {
    const h = t !== void 0, [p, w] = B(n), g = h ? t : p, v = Q(
      (P) => {
        h || w(P), a?.(P);
      },
      [h, a]
    ), b = ve(null), [y, _] = B(null), C = ve(null), E = ve(null), x = Array.isArray(r) ? r : [r], S = x.includes("hover"), k = x.includes("click"), I = Q(() => {
      C.current && (clearTimeout(C.current), C.current = null);
    }, []), $ = Q(() => {
      E.current && (clearTimeout(E.current), E.current = null);
    }, []), j = Q(() => {
      S && ($(), C.current = setTimeout(() => v(!0), o));
    }, [S, o, v, $]), W = Q(() => {
      S && (I(), E.current = setTimeout(() => v(!1), s));
    }, [S, s, v, I]), H = Q(
      (P) => {
        k && (P.preventDefault(), v(!g));
      },
      [k, g, v]
    );
    ue(() => {
      if (!k || !g || h)
        return;
      const P = (K) => {
        const R = b.current;
        R && !R.contains(K.target) && v(!1);
      };
      return document.addEventListener("mousedown", P), () => document.removeEventListener("mousedown", P);
    }, [k, g, h, v]), Xn(() => {
      if (!g || !b.current) {
        _(null);
        return;
      }
      const P = b.current.getBoundingClientRect();
      _(lc(P, c));
    }, [g, c]), ue(
      () => () => {
        I(), $();
      },
      [I, $]
    );
    const V = typeof document < "u" ? m() : null, X = vc(c), F = g && // eslint-disable-next-line eqeqeq
    e != null && e !== "" && y && V && ki(
      /* @__PURE__ */ N(
        "span",
        {
          className: M(Rn.overlay, f),
          style: {
            left: y.left,
            top: y.top,
            transform: y.transform
          },
          role: "tooltip",
          children: [
            e,
            l && /* @__PURE__ */ u("span", { className: M(Rn.arrow, Rn[X]) })
          ]
        }
      ),
      V
    );
    return /* @__PURE__ */ N(Je, { children: [
      /* @__PURE__ */ u("span", { ref: b, ...!h && (S || k) ? {
        onMouseEnter: j,
        onMouseLeave: W,
        onClick: k ? H : void 0
      } : {}, children: d }),
      F
    ] });
  }
);
$o.displayName = "TooltipDark";
const wc = "_wrapper_cybwv_1", bc = "_trigger_cybwv_5", _c = "_icon_cybwv_27", Ln = {
  wrapper: wc,
  trigger: bc,
  icon: _c
}, yc = sn(
  ({
    children: e,
    onClick: t,
    copied: n,
    tooltipText: r = "Скопировано",
    ariaLabel: o,
    showIcon: s = !0,
    className: a
  }) => {
    const c = Q(() => {
      t();
    }, [t]);
    return /* @__PURE__ */ u("span", { className: Ln.wrapper, children: /* @__PURE__ */ u($o, { open: n, title: r, placement: "top", children: /* @__PURE__ */ N(
      tr,
      {
        type: "button",
        variant: null,
        size: null,
        className: M(Ln.trigger, a),
        onClick: c,
        "aria-label": o,
        "aria-live": "polite",
        children: [
          e,
          s && /* @__PURE__ */ u(Ni, { className: Ln.icon, "aria-hidden": !0 })
        ]
      }
    ) }) });
  }
);
yc.displayName = "CopyTextTrigger";
function ae(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function Cc(e, t) {
  const n = i.createContext(t), r = (s) => {
    const { children: a, ...c } = s, l = i.useMemo(() => c, Object.values(c));
    return /* @__PURE__ */ u(n.Provider, { value: l, children: a });
  };
  r.displayName = e + "Provider";
  function o(s) {
    const a = i.useContext(n);
    if (a) return a;
    if (t !== void 0) return t;
    throw new Error(`\`${s}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function an(e, t = []) {
  let n = [];
  function r(s, a) {
    const c = i.createContext(a), l = n.length;
    n = [...n, a];
    const d = (m) => {
      const { scope: h, children: p, ...w } = m, g = h?.[e]?.[l] || c, v = i.useMemo(() => w, Object.values(w));
      return /* @__PURE__ */ u(g.Provider, { value: v, children: p });
    };
    d.displayName = s + "Provider";
    function f(m, h) {
      const p = h?.[e]?.[l] || c, w = i.useContext(p);
      if (w) return w;
      if (a !== void 0) return a;
      throw new Error(`\`${m}\` must be used within \`${s}\``);
    }
    return [d, f];
  }
  const o = () => {
    const s = n.map((a) => i.createContext(a));
    return function(c) {
      const l = c?.[e] || s;
      return i.useMemo(
        () => ({ [`__scope${e}`]: { ...c, [e]: l } }),
        [c, l]
      );
    };
  };
  return o.scopeName = e, [r, xc(o, ...t)];
}
function xc(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const a = r.reduce((c, { useScope: l, scopeName: d }) => {
        const m = l(s)[`__scope${d}`];
        return { ...c, ...m };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
// @__NO_SIDE_EFFECTS__
function Ec(e) {
  const t = /* @__PURE__ */ kc(e), n = i.forwardRef((r, o) => {
    const { children: s, ...a } = r, c = i.Children.toArray(s), l = c.find(Nc);
    if (l) {
      const d = l.props.children, f = c.map((m) => m === l ? i.Children.count(d) > 1 ? i.Children.only(null) : i.isValidElement(d) ? d.props.children : null : m);
      return /* @__PURE__ */ u(t, { ...a, ref: o, children: i.isValidElement(d) ? i.cloneElement(d, void 0, f) : null });
    }
    return /* @__PURE__ */ u(t, { ...a, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function kc(e) {
  const t = i.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (i.isValidElement(o)) {
      const a = Lc(o), c = Rc(s, o.props);
      return o.type !== i.Fragment && (c.ref = r ? Pt(r, a) : a), i.cloneElement(o, c);
    }
    return i.Children.count(o) > 1 ? i.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Sc = /* @__PURE__ */ Symbol("radix.slottable");
function Nc(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Sc;
}
function Rc(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...c) => {
      const l = s(...c);
      return o(...c), l;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Lc(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Ac = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], we = Ac.reduce((e, t) => {
  const n = /* @__PURE__ */ Ec(`Primitive.${t}`), r = i.forwardRef((o, s) => {
    const { asChild: a, ...c } = o, l = a ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u(l, { ...c, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Pc(e, t) {
  e && ho.flushSync(() => e.dispatchEvent(t));
}
function yt(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => (...n) => t.current?.(...n), []);
}
function Mc(e, t = globalThis?.document) {
  const n = yt(e);
  i.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Oc = "DismissableLayer", jn = "dismissableLayer.update", Ic = "dismissableLayer.pointerDownOutside", Tc = "dismissableLayer.focusOutside", Dr, Fo = i.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), cn = i.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: c,
      ...l
    } = e, d = i.useContext(Fo), [f, m] = i.useState(null), h = f?.ownerDocument ?? globalThis?.document, [, p] = i.useState({}), w = Se(t, (S) => m(S)), g = Array.from(d.layers), [v] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), b = g.indexOf(v), y = f ? g.indexOf(f) : -1, _ = d.layersWithOutsidePointerEventsDisabled.size > 0, C = y >= b, E = Fc((S) => {
      const k = S.target, I = [...d.branches].some(($) => $.contains(k));
      !C || I || (o?.(S), a?.(S), S.defaultPrevented || c?.());
    }, h), x = Bc((S) => {
      const k = S.target;
      [...d.branches].some(($) => $.contains(k)) || (s?.(S), a?.(S), S.defaultPrevented || c?.());
    }, h);
    return Mc((S) => {
      y === d.layers.size - 1 && (r?.(S), !S.defaultPrevented && c && (S.preventDefault(), c()));
    }, h), i.useEffect(() => {
      if (f)
        return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (Dr = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), $r(), () => {
          n && d.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = Dr);
        };
    }, [f, h, n, d]), i.useEffect(() => () => {
      f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), $r());
    }, [f, d]), i.useEffect(() => {
      const S = () => p({});
      return document.addEventListener(jn, S), () => document.removeEventListener(jn, S);
    }, []), /* @__PURE__ */ u(
      we.div,
      {
        ...l,
        ref: w,
        style: {
          pointerEvents: _ ? C ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: ae(e.onFocusCapture, x.onFocusCapture),
        onBlurCapture: ae(e.onBlurCapture, x.onBlurCapture),
        onPointerDownCapture: ae(
          e.onPointerDownCapture,
          E.onPointerDownCapture
        )
      }
    );
  }
);
cn.displayName = Oc;
var Dc = "DismissableLayerBranch", $c = i.forwardRef((e, t) => {
  const n = i.useContext(Fo), r = i.useRef(null), o = Se(t, r);
  return i.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ u(we.div, { ...e, ref: o });
});
$c.displayName = Dc;
function Fc(e, t = globalThis?.document) {
  const n = yt(e), r = i.useRef(!1), o = i.useRef(() => {
  });
  return i.useEffect(() => {
    const s = (c) => {
      if (c.target && !r.current) {
        let l = function() {
          Bo(
            Ic,
            n,
            d,
            { discrete: !0 }
          );
        };
        const d = { originalEvent: c };
        c.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = l, t.addEventListener("click", o.current, { once: !0 })) : l();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, a = window.setTimeout(() => {
      t.addEventListener("pointerdown", s);
    }, 0);
    return () => {
      window.clearTimeout(a), t.removeEventListener("pointerdown", s), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function Bc(e, t = globalThis?.document) {
  const n = yt(e), r = i.useRef(!1);
  return i.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && Bo(Tc, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function $r() {
  const e = new CustomEvent(jn);
  document.dispatchEvent(e);
}
function Bo(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Pc(o, s) : o.dispatchEvent(s);
}
var et = globalThis?.document ? i.useLayoutEffect : () => {
}, zc = i[" useId ".trim().toString()] || (() => {
}), jc = 0;
function Rt(e) {
  const [t, n] = i.useState(zc());
  return et(() => {
    n((r) => r ?? String(jc++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Hc = ["top", "right", "bottom", "left"], tt = Math.min, Ee = Math.max, Jt = Math.round, Ft = Math.floor, Te = (e) => ({
  x: e,
  y: e
}), Vc = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Hn(e, t, n) {
  return Ee(e, tt(t, n));
}
function Ve(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function We(e) {
  return e.split("-")[0];
}
function kt(e) {
  return e.split("-")[1];
}
function nr(e) {
  return e === "x" ? "y" : "x";
}
function rr(e) {
  return e === "y" ? "height" : "width";
}
function Ie(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function or(e) {
  return nr(Ie(e));
}
function Wc(e, t, n) {
  n === void 0 && (n = !1);
  const r = kt(e), o = or(e), s = rr(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = en(a)), [a, en(a)];
}
function qc(e) {
  const t = en(e);
  return [Vn(e), t, Vn(t)];
}
function Vn(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const Fr = ["left", "right"], Br = ["right", "left"], Gc = ["top", "bottom"], Uc = ["bottom", "top"];
function Zc(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Br : Fr : t ? Fr : Br;
    case "left":
    case "right":
      return t ? Gc : Uc;
    default:
      return [];
  }
}
function Yc(e, t, n, r) {
  const o = kt(e);
  let s = Zc(We(e), n === "start", r);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(Vn)))), s;
}
function en(e) {
  const t = We(e);
  return Vc[t] + e.slice(t.length);
}
function Xc(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function zo(e) {
  return typeof e != "number" ? Xc(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function tn(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: o
  } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n
  };
}
function zr(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = Ie(t), a = or(t), c = rr(a), l = We(t), d = s === "y", f = r.x + r.width / 2 - o.width / 2, m = r.y + r.height / 2 - o.height / 2, h = r[c] / 2 - o[c] / 2;
  let p;
  switch (l) {
    case "top":
      p = {
        x: f,
        y: r.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: f,
        y: r.y + r.height
      };
      break;
    case "right":
      p = {
        x: r.x + r.width,
        y: m
      };
      break;
    case "left":
      p = {
        x: r.x - o.width,
        y: m
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (kt(t)) {
    case "start":
      p[a] -= h * (n && d ? -1 : 1);
      break;
    case "end":
      p[a] += h * (n && d ? -1 : 1);
      break;
  }
  return p;
}
async function Kc(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: s,
    rects: a,
    elements: c,
    strategy: l
  } = e, {
    boundary: d = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: m = "floating",
    altBoundary: h = !1,
    padding: p = 0
  } = Ve(t, e), w = zo(p), v = c[h ? m === "floating" ? "reference" : "floating" : m], b = tn(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(v))) == null || n ? v : v.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(c.floating)),
    boundary: d,
    rootBoundary: f,
    strategy: l
  })), y = m === "floating" ? {
    x: r,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, _ = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(c.floating)), C = await (s.isElement == null ? void 0 : s.isElement(_)) ? await (s.getScale == null ? void 0 : s.getScale(_)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = tn(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: c,
    rect: y,
    offsetParent: _,
    strategy: l
  }) : y);
  return {
    top: (b.top - E.top + w.top) / C.y,
    bottom: (E.bottom - b.bottom + w.bottom) / C.y,
    left: (b.left - E.left + w.left) / C.x,
    right: (E.right - b.right + w.right) / C.x
  };
}
const Qc = 50, Jc = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: a
  } = n, c = a.detectOverflow ? a : {
    ...a,
    detectOverflow: Kc
  }, l = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let d = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: f,
    y: m
  } = zr(d, r, l), h = r, p = 0;
  const w = {};
  for (let g = 0; g < s.length; g++) {
    const v = s[g];
    if (!v)
      continue;
    const {
      name: b,
      fn: y
    } = v, {
      x: _,
      y: C,
      data: E,
      reset: x
    } = await y({
      x: f,
      y: m,
      initialPlacement: r,
      placement: h,
      strategy: o,
      middlewareData: w,
      rects: d,
      platform: c,
      elements: {
        reference: e,
        floating: t
      }
    });
    f = _ ?? f, m = C ?? m, w[b] = {
      ...w[b],
      ...E
    }, x && p < Qc && (p++, typeof x == "object" && (x.placement && (h = x.placement), x.rects && (d = x.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : x.rects), {
      x: f,
      y: m
    } = zr(d, h, l)), g = -1);
  }
  return {
    x: f,
    y: m,
    placement: h,
    strategy: o,
    middlewareData: w
  };
}, el = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: s,
      platform: a,
      elements: c,
      middlewareData: l
    } = t, {
      element: d,
      padding: f = 0
    } = Ve(e, t) || {};
    if (d == null)
      return {};
    const m = zo(f), h = {
      x: n,
      y: r
    }, p = or(o), w = rr(p), g = await a.getDimensions(d), v = p === "y", b = v ? "top" : "left", y = v ? "bottom" : "right", _ = v ? "clientHeight" : "clientWidth", C = s.reference[w] + s.reference[p] - h[p] - s.floating[w], E = h[p] - s.reference[p], x = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(d));
    let S = x ? x[_] : 0;
    (!S || !await (a.isElement == null ? void 0 : a.isElement(x))) && (S = c.floating[_] || s.floating[w]);
    const k = C / 2 - E / 2, I = S / 2 - g[w] / 2 - 1, $ = tt(m[b], I), j = tt(m[y], I), W = $, H = S - g[w] - j, V = S / 2 - g[w] / 2 + k, X = Hn(W, V, H), F = !l.arrow && kt(o) != null && V !== X && s.reference[w] / 2 - (V < W ? $ : j) - g[w] / 2 < 0, q = F ? V < W ? V - W : V - H : 0;
    return {
      [p]: h[p] + q,
      data: {
        [p]: X,
        centerOffset: V - X - q,
        ...F && {
          alignmentOffset: q
        }
      },
      reset: F
    };
  }
}), tl = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: s,
        rects: a,
        initialPlacement: c,
        platform: l,
        elements: d
      } = t, {
        mainAxis: f = !0,
        crossAxis: m = !0,
        fallbackPlacements: h,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: w = "none",
        flipAlignment: g = !0,
        ...v
      } = Ve(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const b = We(o), y = Ie(c), _ = We(c) === c, C = await (l.isRTL == null ? void 0 : l.isRTL(d.floating)), E = h || (_ || !g ? [en(c)] : qc(c)), x = w !== "none";
      !h && x && E.push(...Yc(c, g, w, C));
      const S = [c, ...E], k = await l.detectOverflow(t, v), I = [];
      let $ = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (f && I.push(k[b]), m) {
        const V = Wc(o, a, C);
        I.push(k[V[0]], k[V[1]]);
      }
      if ($ = [...$, {
        placement: o,
        overflows: I
      }], !I.every((V) => V <= 0)) {
        var j, W;
        const V = (((j = s.flip) == null ? void 0 : j.index) || 0) + 1, X = S[V];
        if (X && (!(m === "alignment" ? y !== Ie(X) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        $.every((P) => Ie(P.placement) === y ? P.overflows[0] > 0 : !0)))
          return {
            data: {
              index: V,
              overflows: $
            },
            reset: {
              placement: X
            }
          };
        let F = (W = $.filter((q) => q.overflows[0] <= 0).sort((q, P) => q.overflows[1] - P.overflows[1])[0]) == null ? void 0 : W.placement;
        if (!F)
          switch (p) {
            case "bestFit": {
              var H;
              const q = (H = $.filter((P) => {
                if (x) {
                  const K = Ie(P.placement);
                  return K === y || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  K === "y";
                }
                return !0;
              }).map((P) => [P.placement, P.overflows.filter((K) => K > 0).reduce((K, R) => K + R, 0)]).sort((P, K) => P[1] - K[1])[0]) == null ? void 0 : H[0];
              q && (F = q);
              break;
            }
            case "initialPlacement":
              F = c;
              break;
          }
        if (o !== F)
          return {
            reset: {
              placement: F
            }
          };
      }
      return {};
    }
  };
};
function jr(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Hr(e) {
  return Hc.some((t) => e[t] >= 0);
}
const nl = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n,
        platform: r
      } = t, {
        strategy: o = "referenceHidden",
        ...s
      } = Ve(e, t);
      switch (o) {
        case "referenceHidden": {
          const a = await r.detectOverflow(t, {
            ...s,
            elementContext: "reference"
          }), c = jr(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: c,
              referenceHidden: Hr(c)
            }
          };
        }
        case "escaped": {
          const a = await r.detectOverflow(t, {
            ...s,
            altBoundary: !0
          }), c = jr(a, n.floating);
          return {
            data: {
              escapedOffsets: c,
              escaped: Hr(c)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, jo = /* @__PURE__ */ new Set(["left", "top"]);
async function rl(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = We(n), c = kt(n), l = Ie(n) === "y", d = jo.has(a) ? -1 : 1, f = s && l ? -1 : 1, m = Ve(t, e);
  let {
    mainAxis: h,
    crossAxis: p,
    alignmentAxis: w
  } = typeof m == "number" ? {
    mainAxis: m,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: m.mainAxis || 0,
    crossAxis: m.crossAxis || 0,
    alignmentAxis: m.alignmentAxis
  };
  return c && typeof w == "number" && (p = c === "end" ? w * -1 : w), l ? {
    x: p * f,
    y: h * d
  } : {
    x: h * d,
    y: p * f
  };
}
const ol = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: s,
        placement: a,
        middlewareData: c
      } = t, l = await rl(t, e);
      return a === ((n = c.offset) == null ? void 0 : n.placement) && (r = c.arrow) != null && r.alignmentOffset ? {} : {
        x: o + l.x,
        y: s + l.y,
        data: {
          ...l,
          placement: a
        }
      };
    }
  };
}, sl = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        platform: s
      } = t, {
        mainAxis: a = !0,
        crossAxis: c = !1,
        limiter: l = {
          fn: (b) => {
            let {
              x: y,
              y: _
            } = b;
            return {
              x: y,
              y: _
            };
          }
        },
        ...d
      } = Ve(e, t), f = {
        x: n,
        y: r
      }, m = await s.detectOverflow(t, d), h = Ie(We(o)), p = nr(h);
      let w = f[p], g = f[h];
      if (a) {
        const b = p === "y" ? "top" : "left", y = p === "y" ? "bottom" : "right", _ = w + m[b], C = w - m[y];
        w = Hn(_, w, C);
      }
      if (c) {
        const b = h === "y" ? "top" : "left", y = h === "y" ? "bottom" : "right", _ = g + m[b], C = g - m[y];
        g = Hn(_, g, C);
      }
      const v = l.fn({
        ...t,
        [p]: w,
        [h]: g
      });
      return {
        ...v,
        data: {
          x: v.x - n,
          y: v.y - r,
          enabled: {
            [p]: a,
            [h]: c
          }
        }
      };
    }
  };
}, il = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: s,
        middlewareData: a
      } = t, {
        offset: c = 0,
        mainAxis: l = !0,
        crossAxis: d = !0
      } = Ve(e, t), f = {
        x: n,
        y: r
      }, m = Ie(o), h = nr(m);
      let p = f[h], w = f[m];
      const g = Ve(c, t), v = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (l) {
        const _ = h === "y" ? "height" : "width", C = s.reference[h] - s.floating[_] + v.mainAxis, E = s.reference[h] + s.reference[_] - v.mainAxis;
        p < C ? p = C : p > E && (p = E);
      }
      if (d) {
        var b, y;
        const _ = h === "y" ? "width" : "height", C = jo.has(We(o)), E = s.reference[m] - s.floating[_] + (C && ((b = a.offset) == null ? void 0 : b[m]) || 0) + (C ? 0 : v.crossAxis), x = s.reference[m] + s.reference[_] + (C ? 0 : ((y = a.offset) == null ? void 0 : y[m]) || 0) - (C ? v.crossAxis : 0);
        w < E ? w = E : w > x && (w = x);
      }
      return {
        [h]: p,
        [m]: w
      };
    }
  };
}, al = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: s,
        platform: a,
        elements: c
      } = t, {
        apply: l = () => {
        },
        ...d
      } = Ve(e, t), f = await a.detectOverflow(t, d), m = We(o), h = kt(o), p = Ie(o) === "y", {
        width: w,
        height: g
      } = s.floating;
      let v, b;
      m === "top" || m === "bottom" ? (v = m, b = h === (await (a.isRTL == null ? void 0 : a.isRTL(c.floating)) ? "start" : "end") ? "left" : "right") : (b = m, v = h === "end" ? "top" : "bottom");
      const y = g - f.top - f.bottom, _ = w - f.left - f.right, C = tt(g - f[v], y), E = tt(w - f[b], _), x = !t.middlewareData.shift;
      let S = C, k = E;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = _), (r = t.middlewareData.shift) != null && r.enabled.y && (S = y), x && !h) {
        const $ = Ee(f.left, 0), j = Ee(f.right, 0), W = Ee(f.top, 0), H = Ee(f.bottom, 0);
        p ? k = w - 2 * ($ !== 0 || j !== 0 ? $ + j : Ee(f.left, f.right)) : S = g - 2 * (W !== 0 || H !== 0 ? W + H : Ee(f.top, f.bottom));
      }
      await l({
        ...t,
        availableWidth: k,
        availableHeight: S
      });
      const I = await a.getDimensions(c.floating);
      return w !== I.width || g !== I.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function ln() {
  return typeof window < "u";
}
function St(e) {
  return Ho(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ke(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function $e(e) {
  var t;
  return (t = (Ho(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Ho(e) {
  return ln() ? e instanceof Node || e instanceof ke(e).Node : !1;
}
function ge(e) {
  return ln() ? e instanceof Element || e instanceof ke(e).Element : !1;
}
function Ge(e) {
  return ln() ? e instanceof HTMLElement || e instanceof ke(e).HTMLElement : !1;
}
function Vr(e) {
  return !ln() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ke(e).ShadowRoot;
}
function Mt(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Le(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && o !== "inline" && o !== "contents";
}
function cl(e) {
  return /^(table|td|th)$/.test(St(e));
}
function dn(e) {
  try {
    if (e.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return e.matches(":modal");
  } catch {
    return !1;
  }
}
const ll = /transform|translate|scale|rotate|perspective|filter/, dl = /paint|layout|strict|content/, lt = (e) => !!e && e !== "none";
let An;
function sr(e) {
  const t = ge(e) ? Le(e) : e;
  return lt(t.transform) || lt(t.translate) || lt(t.scale) || lt(t.rotate) || lt(t.perspective) || !ir() && (lt(t.backdropFilter) || lt(t.filter)) || ll.test(t.willChange || "") || dl.test(t.contain || "");
}
function ul(e) {
  let t = nt(e);
  for (; Ge(t) && !Ct(t); ) {
    if (sr(t))
      return t;
    if (dn(t))
      return null;
    t = nt(t);
  }
  return null;
}
function ir() {
  return An == null && (An = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), An;
}
function Ct(e) {
  return /^(html|body|#document)$/.test(St(e));
}
function Le(e) {
  return ke(e).getComputedStyle(e);
}
function un(e) {
  return ge(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function nt(e) {
  if (St(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Vr(e) && e.host || // Fallback.
    $e(e)
  );
  return Vr(t) ? t.host : t;
}
function Vo(e) {
  const t = nt(e);
  return Ct(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ge(t) && Mt(t) ? t : Vo(t);
}
function Lt(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Vo(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = ke(o);
  if (s) {
    const c = Wn(a);
    return t.concat(a, a.visualViewport || [], Mt(o) ? o : [], c && n ? Lt(c) : []);
  } else
    return t.concat(o, Lt(o, [], n));
}
function Wn(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Wo(e) {
  const t = Le(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Ge(e), s = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, c = Jt(n) !== s || Jt(r) !== a;
  return c && (n = s, r = a), {
    width: n,
    height: r,
    $: c
  };
}
function ar(e) {
  return ge(e) ? e : e.contextElement;
}
function bt(e) {
  const t = ar(e);
  if (!Ge(t))
    return Te(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Wo(t);
  let a = (s ? Jt(n.width) : n.width) / r, c = (s ? Jt(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: a,
    y: c
  };
}
const fl = /* @__PURE__ */ Te(0);
function qo(e) {
  const t = ke(e);
  return !ir() || !t.visualViewport ? fl : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function pl(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== ke(e) ? !1 : t;
}
function ut(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = ar(e);
  let a = Te(1);
  t && (r ? ge(r) && (a = bt(r)) : a = bt(e));
  const c = pl(s, n, r) ? qo(s) : Te(0);
  let l = (o.left + c.x) / a.x, d = (o.top + c.y) / a.y, f = o.width / a.x, m = o.height / a.y;
  if (s) {
    const h = ke(s), p = r && ge(r) ? ke(r) : r;
    let w = h, g = Wn(w);
    for (; g && r && p !== w; ) {
      const v = bt(g), b = g.getBoundingClientRect(), y = Le(g), _ = b.left + (g.clientLeft + parseFloat(y.paddingLeft)) * v.x, C = b.top + (g.clientTop + parseFloat(y.paddingTop)) * v.y;
      l *= v.x, d *= v.y, f *= v.x, m *= v.y, l += _, d += C, w = ke(g), g = Wn(w);
    }
  }
  return tn({
    width: f,
    height: m,
    x: l,
    y: d
  });
}
function fn(e, t) {
  const n = un(e).scrollLeft;
  return t ? t.left + n : ut($e(e)).left + n;
}
function Go(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - fn(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function ml(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", a = $e(r), c = t ? dn(t.floating) : !1;
  if (r === a || c && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = Te(1);
  const f = Te(0), m = Ge(r);
  if ((m || !m && !s) && ((St(r) !== "body" || Mt(a)) && (l = un(r)), m)) {
    const p = ut(r);
    d = bt(r), f.x = p.x + r.clientLeft, f.y = p.y + r.clientTop;
  }
  const h = a && !m && !s ? Go(a, l) : Te(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - l.scrollLeft * d.x + f.x + h.x,
    y: n.y * d.y - l.scrollTop * d.y + f.y + h.y
  };
}
function hl(e) {
  return Array.from(e.getClientRects());
}
function gl(e) {
  const t = $e(e), n = un(e), r = e.ownerDocument.body, o = Ee(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = Ee(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + fn(e);
  const c = -n.scrollTop;
  return Le(r).direction === "rtl" && (a += Ee(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: a,
    y: c
  };
}
const Wr = 25;
function vl(e, t) {
  const n = ke(e), r = $e(e), o = n.visualViewport;
  let s = r.clientWidth, a = r.clientHeight, c = 0, l = 0;
  if (o) {
    s = o.width, a = o.height;
    const f = ir();
    (!f || f && t === "fixed") && (c = o.offsetLeft, l = o.offsetTop);
  }
  const d = fn(r);
  if (d <= 0) {
    const f = r.ownerDocument, m = f.body, h = getComputedStyle(m), p = f.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, w = Math.abs(r.clientWidth - m.clientWidth - p);
    w <= Wr && (s -= w);
  } else d <= Wr && (s += d);
  return {
    width: s,
    height: a,
    x: c,
    y: l
  };
}
function wl(e, t) {
  const n = ut(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = Ge(e) ? bt(e) : Te(1), a = e.clientWidth * s.x, c = e.clientHeight * s.y, l = o * s.x, d = r * s.y;
  return {
    width: a,
    height: c,
    x: l,
    y: d
  };
}
function qr(e, t, n) {
  let r;
  if (t === "viewport")
    r = vl(e, n);
  else if (t === "document")
    r = gl($e(e));
  else if (ge(t))
    r = wl(t, n);
  else {
    const o = qo(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return tn(r);
}
function Uo(e, t) {
  const n = nt(e);
  return n === t || !ge(n) || Ct(n) ? !1 : Le(n).position === "fixed" || Uo(n, t);
}
function bl(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Lt(e, [], !1).filter((c) => ge(c) && St(c) !== "body"), o = null;
  const s = Le(e).position === "fixed";
  let a = s ? nt(e) : e;
  for (; ge(a) && !Ct(a); ) {
    const c = Le(a), l = sr(a);
    !l && c.position === "fixed" && (o = null), (s ? !l && !o : !l && c.position === "static" && !!o && (o.position === "absolute" || o.position === "fixed") || Mt(a) && !l && Uo(e, a)) ? r = r.filter((f) => f !== a) : o = c, a = nt(a);
  }
  return t.set(e, r), r;
}
function _l(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? dn(t) ? [] : bl(t, this._c) : [].concat(n), r], c = qr(t, a[0], o);
  let l = c.top, d = c.right, f = c.bottom, m = c.left;
  for (let h = 1; h < a.length; h++) {
    const p = qr(t, a[h], o);
    l = Ee(p.top, l), d = tt(p.right, d), f = tt(p.bottom, f), m = Ee(p.left, m);
  }
  return {
    width: d - m,
    height: f - l,
    x: m,
    y: l
  };
}
function yl(e) {
  const {
    width: t,
    height: n
  } = Wo(e);
  return {
    width: t,
    height: n
  };
}
function Cl(e, t, n) {
  const r = Ge(t), o = $e(t), s = n === "fixed", a = ut(e, !0, s, t);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = Te(0);
  function d() {
    l.x = fn(o);
  }
  if (r || !r && !s)
    if ((St(t) !== "body" || Mt(o)) && (c = un(t)), r) {
      const p = ut(t, !0, s, t);
      l.x = p.x + t.clientLeft, l.y = p.y + t.clientTop;
    } else o && d();
  s && !r && o && d();
  const f = o && !r && !s ? Go(o, c) : Te(0), m = a.left + c.scrollLeft - l.x - f.x, h = a.top + c.scrollTop - l.y - f.y;
  return {
    x: m,
    y: h,
    width: a.width,
    height: a.height
  };
}
function Pn(e) {
  return Le(e).position === "static";
}
function Gr(e, t) {
  if (!Ge(e) || Le(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return $e(e) === n && (n = n.ownerDocument.body), n;
}
function Zo(e, t) {
  const n = ke(e);
  if (dn(e))
    return n;
  if (!Ge(e)) {
    let o = nt(e);
    for (; o && !Ct(o); ) {
      if (ge(o) && !Pn(o))
        return o;
      o = nt(o);
    }
    return n;
  }
  let r = Gr(e, t);
  for (; r && cl(r) && Pn(r); )
    r = Gr(r, t);
  return r && Ct(r) && Pn(r) && !sr(r) ? n : r || ul(e) || n;
}
const xl = async function(e) {
  const t = this.getOffsetParent || Zo, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Cl(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function El(e) {
  return Le(e).direction === "rtl";
}
const kl = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ml,
  getDocumentElement: $e,
  getClippingRect: _l,
  getOffsetParent: Zo,
  getElementRects: xl,
  getClientRects: hl,
  getDimensions: yl,
  getScale: bt,
  isElement: ge,
  isRTL: El
};
function Yo(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Sl(e, t) {
  let n = null, r;
  const o = $e(e);
  function s() {
    var c;
    clearTimeout(r), (c = n) == null || c.disconnect(), n = null;
  }
  function a(c, l) {
    c === void 0 && (c = !1), l === void 0 && (l = 1), s();
    const d = e.getBoundingClientRect(), {
      left: f,
      top: m,
      width: h,
      height: p
    } = d;
    if (c || t(), !h || !p)
      return;
    const w = Ft(m), g = Ft(o.clientWidth - (f + h)), v = Ft(o.clientHeight - (m + p)), b = Ft(f), _ = {
      rootMargin: -w + "px " + -g + "px " + -v + "px " + -b + "px",
      threshold: Ee(0, tt(1, l)) || 1
    };
    let C = !0;
    function E(x) {
      const S = x[0].intersectionRatio;
      if (S !== l) {
        if (!C)
          return a();
        S ? a(!1, S) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !Yo(d, e.getBoundingClientRect()) && a(), C = !1;
    }
    try {
      n = new IntersectionObserver(E, {
        ..._,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(E, _);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function Xo(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, d = ar(e), f = o || s ? [...d ? Lt(d) : [], ...t ? Lt(t) : []] : [];
  f.forEach((b) => {
    o && b.addEventListener("scroll", n, {
      passive: !0
    }), s && b.addEventListener("resize", n);
  });
  const m = d && c ? Sl(d, n) : null;
  let h = -1, p = null;
  a && (p = new ResizeObserver((b) => {
    let [y] = b;
    y && y.target === d && p && t && (p.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var _;
      (_ = p) == null || _.observe(t);
    })), n();
  }), d && !l && p.observe(d), t && p.observe(t));
  let w, g = l ? ut(e) : null;
  l && v();
  function v() {
    const b = ut(e);
    g && !Yo(g, b) && n(), g = b, w = requestAnimationFrame(v);
  }
  return n(), () => {
    var b;
    f.forEach((y) => {
      o && y.removeEventListener("scroll", n), s && y.removeEventListener("resize", n);
    }), m?.(), (b = p) == null || b.disconnect(), p = null, l && cancelAnimationFrame(w);
  };
}
const Nl = ol, Rl = sl, Ll = tl, Al = al, Pl = nl, Ur = el, Ml = il, Ol = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: kl,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return Jc(e, t, {
    ...o,
    platform: s
  });
};
var Il = typeof document < "u", Tl = function() {
}, Zt = Il ? Xn : Tl;
function nn(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (r = n; r-- !== 0; )
        if (!nn(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const s = o[r];
      if (!(s === "_owner" && e.$$typeof) && !nn(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Ko(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Zr(e, t) {
  const n = Ko(e);
  return Math.round(t * n) / n;
}
function Mn(e) {
  const t = i.useRef(e);
  return Zt(() => {
    t.current = e;
  }), t;
}
function Qo(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: s,
      floating: a
    } = {},
    transform: c = !0,
    whileElementsMounted: l,
    open: d
  } = e, [f, m] = i.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [h, p] = i.useState(r);
  nn(h, r) || p(r);
  const [w, g] = i.useState(null), [v, b] = i.useState(null), y = i.useCallback((P) => {
    P !== x.current && (x.current = P, g(P));
  }, []), _ = i.useCallback((P) => {
    P !== S.current && (S.current = P, b(P));
  }, []), C = s || w, E = a || v, x = i.useRef(null), S = i.useRef(null), k = i.useRef(f), I = l != null, $ = Mn(l), j = Mn(o), W = Mn(d), H = i.useCallback(() => {
    if (!x.current || !S.current)
      return;
    const P = {
      placement: t,
      strategy: n,
      middleware: h
    };
    j.current && (P.platform = j.current), Ol(x.current, S.current, P).then((K) => {
      const R = {
        ...K,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: W.current !== !1
      };
      V.current && !nn(k.current, R) && (k.current = R, ho.flushSync(() => {
        m(R);
      }));
    });
  }, [h, t, n, j, W]);
  Zt(() => {
    d === !1 && k.current.isPositioned && (k.current.isPositioned = !1, m((P) => ({
      ...P,
      isPositioned: !1
    })));
  }, [d]);
  const V = i.useRef(!1);
  Zt(() => (V.current = !0, () => {
    V.current = !1;
  }), []), Zt(() => {
    if (C && (x.current = C), E && (S.current = E), C && E) {
      if ($.current)
        return $.current(C, E, H);
      H();
    }
  }, [C, E, H, $, I]);
  const X = i.useMemo(() => ({
    reference: x,
    floating: S,
    setReference: y,
    setFloating: _
  }), [y, _]), F = i.useMemo(() => ({
    reference: C,
    floating: E
  }), [C, E]), q = i.useMemo(() => {
    const P = {
      position: n,
      left: 0,
      top: 0
    };
    if (!F.floating)
      return P;
    const K = Zr(F.floating, f.x), R = Zr(F.floating, f.y);
    return c ? {
      ...P,
      transform: "translate(" + K + "px, " + R + "px)",
      ...Ko(F.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: K,
      top: R
    };
  }, [n, c, F.floating, f.x, f.y]);
  return i.useMemo(() => ({
    ...f,
    update: H,
    refs: X,
    elements: F,
    floatingStyles: q
  }), [f, H, X, F, q]);
}
const Dl = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: r,
        padding: o
      } = typeof e == "function" ? e(n) : e;
      return r && t(r) ? r.current != null ? Ur({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Ur({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Jo = (e, t) => {
  const n = Nl(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, $l = (e, t) => {
  const n = Rl(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, Fl = (e, t) => ({
  fn: Ml(e).fn,
  options: [e, t]
}), es = (e, t) => {
  const n = Ll(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, ts = (e, t) => {
  const n = Al(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, Bl = (e, t) => {
  const n = Pl(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, zl = (e, t) => {
  const n = Dl(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
};
var jl = "Arrow", ns = i.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ u(
    we.svg,
    {
      ...s,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ u("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
ns.displayName = jl;
var Hl = ns;
function Vl(e) {
  const [t, n] = i.useState(void 0);
  return et(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const s = o[0];
        let a, c;
        if ("borderBoxSize" in s) {
          const l = s.borderBoxSize, d = Array.isArray(l) ? l[0] : l;
          a = d.inlineSize, c = d.blockSize;
        } else
          a = e.offsetWidth, c = e.offsetHeight;
        n({ width: a, height: c });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var cr = "Popper", [rs, pn] = an(cr), [Wl, os] = rs(cr), ss = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = i.useState(null);
  return /* @__PURE__ */ u(Wl, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
ss.displayName = cr;
var is = "PopperAnchor", as = i.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, s = os(is, n), a = i.useRef(null), c = Se(t, a), l = i.useRef(null);
    return i.useEffect(() => {
      const d = l.current;
      l.current = r?.current || a.current, d !== l.current && s.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ u(we.div, { ...o, ref: c });
  }
);
as.displayName = is;
var lr = "PopperContent", [ql, Gl] = rs(lr), cs = i.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: s = "center",
      alignOffset: a = 0,
      arrowPadding: c = 0,
      avoidCollisions: l = !0,
      collisionBoundary: d = [],
      collisionPadding: f = 0,
      sticky: m = "partial",
      hideWhenDetached: h = !1,
      updatePositionStrategy: p = "optimized",
      onPlaced: w,
      ...g
    } = e, v = os(lr, n), [b, y] = i.useState(null), _ = Se(t, (me) => y(me)), [C, E] = i.useState(null), x = Vl(C), S = x?.width ?? 0, k = x?.height ?? 0, I = r + (s !== "center" ? "-" + s : ""), $ = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, j = Array.isArray(d) ? d : [d], W = j.length > 0, H = {
      padding: $,
      boundary: j.filter(Zl),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: W
    }, { refs: V, floatingStyles: X, placement: F, isPositioned: q, middlewareData: P } = Qo({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: I,
      whileElementsMounted: (...me) => Xo(...me, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: v.anchor
      },
      middleware: [
        Jo({ mainAxis: o + k, alignmentAxis: a }),
        l && $l({
          mainAxis: !0,
          crossAxis: !1,
          limiter: m === "partial" ? Fl() : void 0,
          ...H
        }),
        l && es({ ...H }),
        ts({
          ...H,
          apply: ({ elements: me, rects: D, availableWidth: Y, availableHeight: Ce }) => {
            const { width: Re, height: Ne } = D.reference, U = me.floating.style;
            U.setProperty("--radix-popper-available-width", `${Y}px`), U.setProperty("--radix-popper-available-height", `${Ce}px`), U.setProperty("--radix-popper-anchor-width", `${Re}px`), U.setProperty("--radix-popper-anchor-height", `${Ne}px`);
          }
        }),
        C && zl({ element: C, padding: c }),
        Yl({ arrowWidth: S, arrowHeight: k }),
        h && Bl({ strategy: "referenceHidden", ...H })
      ]
    }), [K, R] = us(F), fe = yt(w);
    et(() => {
      q && fe?.();
    }, [q, fe]);
    const pe = P.arrow?.x, oe = P.arrow?.y, ce = P.arrow?.centerOffset !== 0, [G, te] = i.useState();
    return et(() => {
      b && te(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ u(
      "div",
      {
        ref: V.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...X,
          transform: q ? X.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: G,
          "--radix-popper-transform-origin": [
            P.transformOrigin?.x,
            P.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...P.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ u(
          ql,
          {
            scope: n,
            placedSide: K,
            onArrowChange: E,
            arrowX: pe,
            arrowY: oe,
            shouldHideArrow: ce,
            children: /* @__PURE__ */ u(
              we.div,
              {
                "data-side": K,
                "data-align": R,
                ...g,
                ref: _,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: q ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
cs.displayName = lr;
var ls = "PopperArrow", Ul = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ds = i.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, s = Gl(ls, r), a = Ul[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ u(
      "span",
      {
        ref: s.onArrowChange,
        style: {
          position: "absolute",
          left: s.arrowX,
          top: s.arrowY,
          [a]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[s.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[s.placedSide],
          visibility: s.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ u(
          Hl,
          {
            ...o,
            ref: n,
            style: {
              ...o.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
ds.displayName = ls;
function Zl(e) {
  return e !== null;
}
var Yl = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, a = o.arrow?.centerOffset !== 0, c = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [d, f] = us(n), m = { start: "0%", center: "50%", end: "100%" }[f], h = (o.arrow?.x ?? 0) + c / 2, p = (o.arrow?.y ?? 0) + l / 2;
    let w = "", g = "";
    return d === "bottom" ? (w = a ? m : `${h}px`, g = `${-l}px`) : d === "top" ? (w = a ? m : `${h}px`, g = `${r.floating.height + l}px`) : d === "right" ? (w = `${-l}px`, g = a ? m : `${p}px`) : d === "left" && (w = `${r.floating.width + l}px`, g = a ? m : `${p}px`), { data: { x: w, y: g } };
  }
});
function us(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var fs = ss, dr = as, ps = cs, ms = ds, Xl = "Portal", mn = i.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = i.useState(!1);
  et(() => s(!0), []);
  const a = n || o && globalThis?.document?.body;
  return a ? go.createPortal(/* @__PURE__ */ u(we.div, { ...r, ref: t }), a) : null;
});
mn.displayName = Xl;
function Kl(e, t) {
  return i.useReducer((n, r) => t[n][r] ?? n, e);
}
var ot = (e) => {
  const { present: t, children: n } = e, r = Ql(t), o = typeof n == "function" ? n({ present: r.isPresent }) : i.Children.only(n), s = Se(r.ref, Jl(o));
  return typeof n == "function" || r.isPresent ? i.cloneElement(o, { ref: s }) : null;
};
ot.displayName = "Presence";
function Ql(e) {
  const [t, n] = i.useState(), r = i.useRef(null), o = i.useRef(e), s = i.useRef("none"), a = e ? "mounted" : "unmounted", [c, l] = Kl(a, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return i.useEffect(() => {
    const d = Bt(r.current);
    s.current = c === "mounted" ? d : "none";
  }, [c]), et(() => {
    const d = r.current, f = o.current;
    if (f !== e) {
      const h = s.current, p = Bt(d);
      e ? l("MOUNT") : p === "none" || d?.display === "none" ? l("UNMOUNT") : l(f && h !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), et(() => {
    if (t) {
      let d;
      const f = t.ownerDocument.defaultView ?? window, m = (p) => {
        const g = Bt(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && g && (l("ANIMATION_END"), !o.current)) {
          const v = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = v);
          });
        }
      }, h = (p) => {
        p.target === t && (s.current = Bt(r.current));
      };
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", m), t.addEventListener("animationend", m), () => {
        f.clearTimeout(d), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", m), t.removeEventListener("animationend", m);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(c),
    ref: i.useCallback((d) => {
      r.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function Bt(e) {
  return e?.animationName || "none";
}
function Jl(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ed = /* @__PURE__ */ Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function td(e) {
  const t = ({ children: n }) => /* @__PURE__ */ u(Je, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = ed, t;
}
var nd = i[" useInsertionEffect ".trim().toString()] || et;
function ur({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, s, a] = rd({
    defaultProp: t,
    onChange: n
  }), c = e !== void 0, l = c ? e : o;
  {
    const f = i.useRef(e !== void 0);
    i.useEffect(() => {
      const m = f.current;
      m !== c && console.warn(
        `${r} is changing from ${m ? "controlled" : "uncontrolled"} to ${c ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = c;
    }, [c, r]);
  }
  const d = i.useCallback(
    (f) => {
      if (c) {
        const m = od(f) ? f(e) : f;
        m !== e && a.current?.(m);
      } else
        s(f);
    },
    [c, e, s, a]
  );
  return [l, d];
}
function rd({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = i.useState(e), o = i.useRef(n), s = i.useRef(t);
  return nd(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    o.current !== n && (s.current?.(n), o.current = n);
  }, [n, o]), [n, r, s];
}
function od(e) {
  return typeof e == "function";
}
var sd = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), id = "VisuallyHidden", hs = i.forwardRef(
  (e, t) => /* @__PURE__ */ u(
    we.span,
    {
      ...e,
      ref: t,
      style: { ...sd, ...e.style }
    }
  )
);
hs.displayName = id;
var ad = hs, [hn] = an("Tooltip", [
  pn
]), gn = pn(), gs = "TooltipProvider", cd = 700, qn = "tooltip.open", [ld, fr] = hn(gs), vs = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = cd,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: s
  } = e, a = i.useRef(!0), c = i.useRef(!1), l = i.useRef(0);
  return i.useEffect(() => {
    const d = l.current;
    return () => window.clearTimeout(d);
  }, []), /* @__PURE__ */ u(
    ld,
    {
      scope: t,
      isOpenDelayedRef: a,
      delayDuration: n,
      onOpen: i.useCallback(() => {
        window.clearTimeout(l.current), a.current = !1;
      }, []),
      onClose: i.useCallback(() => {
        window.clearTimeout(l.current), l.current = window.setTimeout(
          () => a.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: c,
      onPointerInTransitChange: i.useCallback((d) => {
        c.current = d;
      }, []),
      disableHoverableContent: o,
      children: s
    }
  );
};
vs.displayName = gs;
var At = "Tooltip", [dd, Ot] = hn(At), ws = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    disableHoverableContent: a,
    delayDuration: c
  } = e, l = fr(At, e.__scopeTooltip), d = gn(t), [f, m] = i.useState(null), h = Rt(), p = i.useRef(0), w = a ?? l.disableHoverableContent, g = c ?? l.delayDuration, v = i.useRef(!1), [b, y] = ur({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (S) => {
      S ? (l.onOpen(), document.dispatchEvent(new CustomEvent(qn))) : l.onClose(), s?.(S);
    },
    caller: At
  }), _ = i.useMemo(() => b ? v.current ? "delayed-open" : "instant-open" : "closed", [b]), C = i.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, v.current = !1, y(!0);
  }, [y]), E = i.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, y(!1);
  }, [y]), x = i.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      v.current = !0, y(!0), p.current = 0;
    }, g);
  }, [g, y]);
  return i.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ u(fs, { ...d, children: /* @__PURE__ */ u(
    dd,
    {
      scope: t,
      contentId: h,
      open: b,
      stateAttribute: _,
      trigger: f,
      onTriggerChange: m,
      onTriggerEnter: i.useCallback(() => {
        l.isOpenDelayedRef.current ? x() : C();
      }, [l.isOpenDelayedRef, x, C]),
      onTriggerLeave: i.useCallback(() => {
        w ? E() : (window.clearTimeout(p.current), p.current = 0);
      }, [E, w]),
      onOpen: C,
      onClose: E,
      disableHoverableContent: w,
      children: n
    }
  ) });
};
ws.displayName = At;
var Gn = "TooltipTrigger", bs = i.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Ot(Gn, n), s = fr(Gn, n), a = gn(n), c = i.useRef(null), l = Se(t, c, o.onTriggerChange), d = i.useRef(!1), f = i.useRef(!1), m = i.useCallback(() => d.current = !1, []);
    return i.useEffect(() => () => document.removeEventListener("pointerup", m), [m]), /* @__PURE__ */ u(dr, { asChild: !0, ...a, children: /* @__PURE__ */ u(
      we.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: l,
        onPointerMove: ae(e.onPointerMove, (h) => {
          h.pointerType !== "touch" && !f.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(), f.current = !0);
        }),
        onPointerLeave: ae(e.onPointerLeave, () => {
          o.onTriggerLeave(), f.current = !1;
        }),
        onPointerDown: ae(e.onPointerDown, () => {
          o.open && o.onClose(), d.current = !0, document.addEventListener("pointerup", m, { once: !0 });
        }),
        onFocus: ae(e.onFocus, () => {
          d.current || o.onOpen();
        }),
        onBlur: ae(e.onBlur, o.onClose),
        onClick: ae(e.onClick, o.onClose)
      }
    ) });
  }
);
bs.displayName = Gn;
var pr = "TooltipPortal", [ud, fd] = hn(pr, {
  forceMount: void 0
}), _s = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, s = Ot(pr, t);
  return /* @__PURE__ */ u(ud, { scope: t, forceMount: n, children: /* @__PURE__ */ u(ot, { present: n || s.open, children: /* @__PURE__ */ u(mn, { asChild: !0, container: o, children: r }) }) });
};
_s.displayName = pr;
var xt = "TooltipContent", ys = i.forwardRef(
  (e, t) => {
    const n = fd(xt, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...s } = e, a = Ot(xt, e.__scopeTooltip);
    return /* @__PURE__ */ u(ot, { present: r || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ u(Cs, { side: o, ...s, ref: t }) : /* @__PURE__ */ u(pd, { side: o, ...s, ref: t }) });
  }
), pd = i.forwardRef((e, t) => {
  const n = Ot(xt, e.__scopeTooltip), r = fr(xt, e.__scopeTooltip), o = i.useRef(null), s = Se(t, o), [a, c] = i.useState(null), { trigger: l, onClose: d } = n, f = o.current, { onPointerInTransitChange: m } = r, h = i.useCallback(() => {
    c(null), m(!1);
  }, [m]), p = i.useCallback(
    (w, g) => {
      const v = w.currentTarget, b = { x: w.clientX, y: w.clientY }, y = wd(b, v.getBoundingClientRect()), _ = bd(b, y), C = _d(g.getBoundingClientRect()), E = Cd([..._, ...C]);
      c(E), m(!0);
    },
    [m]
  );
  return i.useEffect(() => () => h(), [h]), i.useEffect(() => {
    if (l && f) {
      const w = (v) => p(v, f), g = (v) => p(v, l);
      return l.addEventListener("pointerleave", w), f.addEventListener("pointerleave", g), () => {
        l.removeEventListener("pointerleave", w), f.removeEventListener("pointerleave", g);
      };
    }
  }, [l, f, p, h]), i.useEffect(() => {
    if (a) {
      const w = (g) => {
        const v = g.target, b = { x: g.clientX, y: g.clientY }, y = l?.contains(v) || f?.contains(v), _ = !yd(b, a);
        y ? h() : _ && (h(), d());
      };
      return document.addEventListener("pointermove", w), () => document.removeEventListener("pointermove", w);
    }
  }, [l, f, a, d, h]), /* @__PURE__ */ u(Cs, { ...e, ref: s });
}), [md, hd] = hn(At, { isInside: !1 }), gd = /* @__PURE__ */ td("TooltipContent"), Cs = i.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      ...c
    } = e, l = Ot(xt, n), d = gn(n), { onClose: f } = l;
    return i.useEffect(() => (document.addEventListener(qn, f), () => document.removeEventListener(qn, f)), [f]), i.useEffect(() => {
      if (l.trigger) {
        const m = (h) => {
          h.target?.contains(l.trigger) && f();
        };
        return window.addEventListener("scroll", m, { capture: !0 }), () => window.removeEventListener("scroll", m, { capture: !0 });
      }
    }, [l.trigger, f]), /* @__PURE__ */ u(
      cn,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: a,
        onFocusOutside: (m) => m.preventDefault(),
        onDismiss: f,
        children: /* @__PURE__ */ N(
          ps,
          {
            "data-state": l.stateAttribute,
            ...d,
            ...c,
            ref: t,
            style: {
              ...c.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ u(gd, { children: r }),
              /* @__PURE__ */ u(md, { scope: n, isInside: !0, children: /* @__PURE__ */ u(ad, { id: l.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
ys.displayName = xt;
var xs = "TooltipArrow", vd = i.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = gn(n);
    return hd(
      xs,
      n
    ).isInside ? null : /* @__PURE__ */ u(ms, { ...o, ...r, ref: t });
  }
);
vd.displayName = xs;
function wd(e, t) {
  const n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), o = Math.abs(t.right - e.x), s = Math.abs(t.left - e.x);
  switch (Math.min(n, r, o, s)) {
    case s:
      return "left";
    case o:
      return "right";
    case n:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function bd(e, t, n = 5) {
  const r = [];
  switch (t) {
    case "top":
      r.push(
        { x: e.x - n, y: e.y + n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "bottom":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x + n, y: e.y - n }
      );
      break;
    case "left":
      r.push(
        { x: e.x + n, y: e.y - n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "right":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x - n, y: e.y + n }
      );
      break;
  }
  return r;
}
function _d(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function yd(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const c = t[s], l = t[a], d = c.x, f = c.y, m = l.x, h = l.y;
    f > r != h > r && n < (m - d) * (r - f) / (h - f) + d && (o = !o);
  }
  return o;
}
function Cd(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), xd(t);
}
function xd(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (; t.length >= 2; ) {
      const s = t[t.length - 1], a = t[t.length - 2];
      if ((s.x - a.x) * (o.y - a.y) >= (s.y - a.y) * (o.x - a.x)) t.pop();
      else break;
    }
    t.push(o);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    for (; n.length >= 2; ) {
      const s = n[n.length - 1], a = n[n.length - 2];
      if ((s.x - a.x) * (o.y - a.y) >= (s.y - a.y) * (o.x - a.x)) n.pop();
      else break;
    }
    n.push(o);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var Ed = vs, kd = ws, Sd = bs, Nd = _s, Es = ys;
const Rd = Ed, Ld = kd, Ad = Sd, ks = i.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ u(Nd, { children: /* @__PURE__ */ u(
  Es,
  {
    ref: r,
    sideOffset: t,
    className: De(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
      e
    ),
    ...n
  }
) }));
ks.displayName = Es.displayName;
const Pd = "_anchor_twryn_1", Md = "_tooltip_twryn_6", Yr = {
  anchor: Pd,
  tooltip: Md
}, Xr = (e) => typeof e == "string" ? document.getElementById(e) : "current" in e ? e.current : e, Od = (e = "top") => {
  const [t, n] = e.split("-");
  return { side: t, align: n ?? "center" };
}, Kr = (e, t) => typeof e == "number" ? e : e?.[t] ?? 0, Id = ({
  children: e,
  target: t,
  placement: n = "top",
  popperClassName: r,
  isOpen: o,
  toggle: s,
  delay: a,
  autohide: c = !0
}) => {
  const [l, d] = B(!1), [f, m] = B(null), h = o ?? l, { side: p, align: w } = qe(() => Od(n), [n]), g = Q(() => {
    const b = Xr(t);
    m(b?.getBoundingClientRect() ?? null);
  }, [t]), v = Q(
    (b) => {
      o === void 0 && d(b), s?.();
    },
    [o, s]
  );
  return ue(() => {
    const b = Xr(t);
    if (!b)
      return;
    let y = null, _ = null;
    const C = () => {
      y && clearTimeout(y), _ && clearTimeout(_);
    }, E = () => {
      C(), g(), y = setTimeout(() => v(!0), Kr(a, "show"));
    }, x = () => {
      c && (C(), _ = setTimeout(() => v(!1), Kr(a, "hide")));
    };
    return b.addEventListener("mouseenter", E), b.addEventListener("mouseleave", x), b.addEventListener("focus", E), b.addEventListener("blur", x), window.addEventListener("scroll", g, !0), window.addEventListener("resize", g), () => {
      C(), b.removeEventListener("mouseenter", E), b.removeEventListener("mouseleave", x), b.removeEventListener("focus", E), b.removeEventListener("blur", x), window.removeEventListener("scroll", g, !0), window.removeEventListener("resize", g);
    };
  }, [c, a, v, t, g]), f ? /* @__PURE__ */ u(Rd, { delayDuration: 0, children: /* @__PURE__ */ N(Ld, { open: h, onOpenChange: v, children: [
    /* @__PURE__ */ u(Ad, { asChild: !0, children: /* @__PURE__ */ u(
      "span",
      {
        className: Yr.anchor,
        style: { left: f.left, top: f.top, width: f.width, height: f.height }
      }
    ) }),
    /* @__PURE__ */ u(ks, { side: p, align: w, className: M(Yr.tooltip, r), children: e })
  ] }) }) : null;
};
var On = 0;
function Ss() {
  i.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Qr()), document.body.insertAdjacentElement("beforeend", e[1] ?? Qr()), On++, () => {
      On === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), On--;
    };
  }, []);
}
function Qr() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var In = "focusScope.autoFocusOnMount", Tn = "focusScope.autoFocusOnUnmount", Jr = { bubbles: !1, cancelable: !0 }, Td = "FocusScope", mr = i.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...a
  } = e, [c, l] = i.useState(null), d = yt(o), f = yt(s), m = i.useRef(null), h = Se(t, (g) => l(g)), p = i.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  i.useEffect(() => {
    if (r) {
      let g = function(_) {
        if (p.paused || !c) return;
        const C = _.target;
        c.contains(C) ? m.current = C : Qe(m.current, { select: !0 });
      }, v = function(_) {
        if (p.paused || !c) return;
        const C = _.relatedTarget;
        C !== null && (c.contains(C) || Qe(m.current, { select: !0 }));
      }, b = function(_) {
        if (document.activeElement === document.body)
          for (const E of _)
            E.removedNodes.length > 0 && Qe(c);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", v);
      const y = new MutationObserver(b);
      return c && y.observe(c, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", v), y.disconnect();
      };
    }
  }, [r, c, p.paused]), i.useEffect(() => {
    if (c) {
      to.add(p);
      const g = document.activeElement;
      if (!c.contains(g)) {
        const b = new CustomEvent(In, Jr);
        c.addEventListener(In, d), c.dispatchEvent(b), b.defaultPrevented || (Dd(jd(Ns(c)), { select: !0 }), document.activeElement === g && Qe(c));
      }
      return () => {
        c.removeEventListener(In, d), setTimeout(() => {
          const b = new CustomEvent(Tn, Jr);
          c.addEventListener(Tn, f), c.dispatchEvent(b), b.defaultPrevented || Qe(g ?? document.body, { select: !0 }), c.removeEventListener(Tn, f), to.remove(p);
        }, 0);
      };
    }
  }, [c, d, f, p]);
  const w = i.useCallback(
    (g) => {
      if (!n && !r || p.paused) return;
      const v = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, b = document.activeElement;
      if (v && b) {
        const y = g.currentTarget, [_, C] = $d(y);
        _ && C ? !g.shiftKey && b === C ? (g.preventDefault(), n && Qe(_, { select: !0 })) : g.shiftKey && b === _ && (g.preventDefault(), n && Qe(C, { select: !0 })) : b === y && g.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ u(we.div, { tabIndex: -1, ...a, ref: h, onKeyDown: w });
});
mr.displayName = Td;
function Dd(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Qe(r, { select: t }), document.activeElement !== n) return;
}
function $d(e) {
  const t = Ns(e), n = eo(t, e), r = eo(t.reverse(), e);
  return [n, r];
}
function Ns(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function eo(e, t) {
  for (const n of e)
    if (!Fd(n, { upTo: t })) return n;
}
function Fd(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Bd(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Qe(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Bd(e) && t && e.select();
  }
}
var to = zd();
function zd() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = no(e, t), e.unshift(t);
    },
    remove(t) {
      e = no(e, t), e[0]?.resume();
    }
  };
}
function no(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function jd(e) {
  return e.filter((t) => t.tagName !== "A");
}
// @__NO_SIDE_EFFECTS__
function Hd(e) {
  const t = /* @__PURE__ */ Vd(e), n = i.forwardRef((r, o) => {
    const { children: s, ...a } = r, c = i.Children.toArray(s), l = c.find(qd);
    if (l) {
      const d = l.props.children, f = c.map((m) => m === l ? i.Children.count(d) > 1 ? i.Children.only(null) : i.isValidElement(d) ? d.props.children : null : m);
      return /* @__PURE__ */ u(t, { ...a, ref: o, children: i.isValidElement(d) ? i.cloneElement(d, void 0, f) : null });
    }
    return /* @__PURE__ */ u(t, { ...a, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Vd(e) {
  const t = i.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (i.isValidElement(o)) {
      const a = Ud(o), c = Gd(s, o.props);
      return o.type !== i.Fragment && (c.ref = r ? Pt(r, a) : a), i.cloneElement(o, c);
    }
    return i.Children.count(o) > 1 ? i.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Wd = /* @__PURE__ */ Symbol("radix.slottable");
function qd(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Wd;
}
function Gd(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...c) => {
      const l = s(...c);
      return o(...c), l;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Ud(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Zd = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, ht = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap(), jt = {}, Dn = 0, Rs = function(e) {
  return e && (e.host || Rs(e.parentNode));
}, Yd = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Rs(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Xd = function(e, t, n, r) {
  var o = Yd(t, Array.isArray(e) ? e : [e]);
  jt[n] || (jt[n] = /* @__PURE__ */ new WeakMap());
  var s = jt[n], a = [], c = /* @__PURE__ */ new Set(), l = new Set(o), d = function(m) {
    !m || c.has(m) || (c.add(m), d(m.parentNode));
  };
  o.forEach(d);
  var f = function(m) {
    !m || l.has(m) || Array.prototype.forEach.call(m.children, function(h) {
      if (c.has(h))
        f(h);
      else
        try {
          var p = h.getAttribute(r), w = p !== null && p !== "false", g = (ht.get(h) || 0) + 1, v = (s.get(h) || 0) + 1;
          ht.set(h, g), s.set(h, v), a.push(h), g === 1 && w && zt.set(h, !0), v === 1 && h.setAttribute(n, "true"), w || h.setAttribute(r, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", h, b);
        }
    });
  };
  return f(t), c.clear(), Dn++, function() {
    a.forEach(function(m) {
      var h = ht.get(m) - 1, p = s.get(m) - 1;
      ht.set(m, h), s.set(m, p), h || (zt.has(m) || m.removeAttribute(r), zt.delete(m)), p || m.removeAttribute(n);
    }), Dn--, Dn || (ht = /* @__PURE__ */ new WeakMap(), ht = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap(), jt = {});
  };
}, Ls = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Zd(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Xd(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, Oe = function() {
  return Oe = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, Oe.apply(this, arguments);
};
function As(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Kd(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var Yt = "right-scroll-bar-position", Xt = "width-before-scroll-bar", Qd = "with-scroll-bars-hidden", Jd = "--removed-body-scroll-bar-size";
function $n(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function eu(e, t) {
  var n = B(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && (n.value = r, n.callback(r, o));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var tu = typeof window < "u" ? i.useLayoutEffect : i.useEffect, ro = /* @__PURE__ */ new WeakMap();
function nu(e, t) {
  var n = eu(null, function(r) {
    return e.forEach(function(o) {
      return $n(o, r);
    });
  });
  return tu(function() {
    var r = ro.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), a = n.current;
      o.forEach(function(c) {
        s.has(c) || $n(c, null);
      }), s.forEach(function(c) {
        o.has(c) || $n(c, a);
      });
    }
    ro.set(n, e);
  }, [e]), n;
}
function ru(e) {
  return e;
}
function ou(e, t) {
  t === void 0 && (t = ru);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(s) {
      var a = t(s, r);
      return n.push(a), function() {
        n = n.filter(function(c) {
          return c !== a;
        });
      };
    },
    assignSyncMedium: function(s) {
      for (r = !0; n.length; ) {
        var a = n;
        n = [], a.forEach(s);
      }
      n = {
        push: function(c) {
          return s(c);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(s) {
      r = !0;
      var a = [];
      if (n.length) {
        var c = n;
        n = [], c.forEach(s), a = n;
      }
      var l = function() {
        var f = a;
        a = [], f.forEach(s);
      }, d = function() {
        return Promise.resolve().then(l);
      };
      d(), n = {
        push: function(f) {
          a.push(f), d();
        },
        filter: function(f) {
          return a = a.filter(f), n;
        }
      };
    }
  };
  return o;
}
function su(e) {
  e === void 0 && (e = {});
  var t = ou(null);
  return t.options = Oe({ async: !0, ssr: !1 }, e), t;
}
var Ps = function(e) {
  var t = e.sideCar, n = As(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return i.createElement(r, Oe({}, n));
};
Ps.isSideCarExport = !0;
function iu(e, t) {
  return e.useMedium(t), Ps;
}
var Ms = su(), Fn = function() {
}, vn = i.forwardRef(function(e, t) {
  var n = i.useRef(null), r = i.useState({
    onScrollCapture: Fn,
    onWheelCapture: Fn,
    onTouchMoveCapture: Fn
  }), o = r[0], s = r[1], a = e.forwardProps, c = e.children, l = e.className, d = e.removeScrollBar, f = e.enabled, m = e.shards, h = e.sideCar, p = e.noRelative, w = e.noIsolation, g = e.inert, v = e.allowPinchZoom, b = e.as, y = b === void 0 ? "div" : b, _ = e.gapMode, C = As(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), E = h, x = nu([n, t]), S = Oe(Oe({}, C), o);
  return i.createElement(
    i.Fragment,
    null,
    f && i.createElement(E, { sideCar: Ms, removeScrollBar: d, shards: m, noRelative: p, noIsolation: w, inert: g, setCallbacks: s, allowPinchZoom: !!v, lockRef: n, gapMode: _ }),
    a ? i.cloneElement(i.Children.only(c), Oe(Oe({}, S), { ref: x })) : i.createElement(y, Oe({}, S, { className: l, ref: x }), c)
  );
});
vn.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
vn.classNames = {
  fullWidth: Xt,
  zeroRight: Yt
};
var au = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function cu() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = au();
  return t && e.setAttribute("nonce", t), e;
}
function lu(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function du(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var uu = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = cu()) && (lu(t, n), du(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, fu = function() {
  var e = uu();
  return function(t, n) {
    i.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Os = function() {
  var e = fu(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, pu = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Bn = function(e) {
  return parseInt(e || "", 10) || 0;
}, mu = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Bn(n), Bn(r), Bn(o)];
}, hu = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return pu;
  var t = mu(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, gu = Os(), _t = "data-scroll-locked", vu = function(e, t, n, r) {
  var o = e.left, s = e.top, a = e.right, c = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Qd, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(c, "px ").concat(r, `;
  }
  body[`).concat(_t, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(s, `px;
    padding-right: `).concat(a, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(c, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(c, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Yt, ` {
    right: `).concat(c, "px ").concat(r, `;
  }
  
  .`).concat(Xt, ` {
    margin-right: `).concat(c, "px ").concat(r, `;
  }
  
  .`).concat(Yt, " .").concat(Yt, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Xt, " .").concat(Xt, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(_t, `] {
    `).concat(Jd, ": ").concat(c, `px;
  }
`);
}, oo = function() {
  var e = parseInt(document.body.getAttribute(_t) || "0", 10);
  return isFinite(e) ? e : 0;
}, wu = function() {
  i.useEffect(function() {
    return document.body.setAttribute(_t, (oo() + 1).toString()), function() {
      var e = oo() - 1;
      e <= 0 ? document.body.removeAttribute(_t) : document.body.setAttribute(_t, e.toString());
    };
  }, []);
}, bu = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  wu();
  var s = i.useMemo(function() {
    return hu(o);
  }, [o]);
  return i.createElement(gu, { styles: vu(s, !t, o, n ? "" : "!important") });
}, Un = !1;
if (typeof window < "u")
  try {
    var Ht = Object.defineProperty({}, "passive", {
      get: function() {
        return Un = !0, !0;
      }
    });
    window.addEventListener("test", Ht, Ht), window.removeEventListener("test", Ht, Ht);
  } catch {
    Un = !1;
  }
var gt = Un ? { passive: !1 } : !1, _u = function(e) {
  return e.tagName === "TEXTAREA";
}, Is = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !_u(e) && n[t] === "visible")
  );
}, yu = function(e) {
  return Is(e, "overflowY");
}, Cu = function(e) {
  return Is(e, "overflowX");
}, so = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Ts(e, r);
    if (o) {
      var s = Ds(e, r), a = s[1], c = s[2];
      if (a > c)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, xu = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Eu = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Ts = function(e, t) {
  return e === "v" ? yu(t) : Cu(t);
}, Ds = function(e, t) {
  return e === "v" ? xu(t) : Eu(t);
}, ku = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Su = function(e, t, n, r, o) {
  var s = ku(e, window.getComputedStyle(t).direction), a = s * r, c = n.target, l = t.contains(c), d = !1, f = a > 0, m = 0, h = 0;
  do {
    if (!c)
      break;
    var p = Ds(e, c), w = p[0], g = p[1], v = p[2], b = g - v - s * w;
    (w || b) && Ts(e, c) && (m += b, h += w);
    var y = c.parentNode;
    c = y && y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? y.host : y;
  } while (
    // portaled content
    !l && c !== document.body || // self content
    l && (t.contains(c) || t === c)
  );
  return (f && Math.abs(m) < 1 || !f && Math.abs(h) < 1) && (d = !0), d;
}, Vt = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, io = function(e) {
  return [e.deltaX, e.deltaY];
}, ao = function(e) {
  return e && "current" in e ? e.current : e;
}, Nu = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Ru = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Lu = 0, vt = [];
function Au(e) {
  var t = i.useRef([]), n = i.useRef([0, 0]), r = i.useRef(), o = i.useState(Lu++)[0], s = i.useState(Os)[0], a = i.useRef(e);
  i.useEffect(function() {
    a.current = e;
  }, [e]), i.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = Kd([e.lockRef.current], (e.shards || []).map(ao), !0).filter(Boolean);
      return g.forEach(function(v) {
        return v.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(v) {
          return v.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var c = i.useCallback(function(g, v) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !a.current.allowPinchZoom;
    var b = Vt(g), y = n.current, _ = "deltaX" in g ? g.deltaX : y[0] - b[0], C = "deltaY" in g ? g.deltaY : y[1] - b[1], E, x = g.target, S = Math.abs(_) > Math.abs(C) ? "h" : "v";
    if ("touches" in g && S === "h" && x.type === "range")
      return !1;
    var k = window.getSelection(), I = k && k.anchorNode, $ = I ? I === x || I.contains(x) : !1;
    if ($)
      return !1;
    var j = so(S, x);
    if (!j)
      return !0;
    if (j ? E = S : (E = S === "v" ? "h" : "v", j = so(S, x)), !j)
      return !1;
    if (!r.current && "changedTouches" in g && (_ || C) && (r.current = E), !E)
      return !0;
    var W = r.current || E;
    return Su(W, v, g, W === "h" ? _ : C);
  }, []), l = i.useCallback(function(g) {
    var v = g;
    if (!(!vt.length || vt[vt.length - 1] !== s)) {
      var b = "deltaY" in v ? io(v) : Vt(v), y = t.current.filter(function(E) {
        return E.name === v.type && (E.target === v.target || v.target === E.shadowParent) && Nu(E.delta, b);
      })[0];
      if (y && y.should) {
        v.cancelable && v.preventDefault();
        return;
      }
      if (!y) {
        var _ = (a.current.shards || []).map(ao).filter(Boolean).filter(function(E) {
          return E.contains(v.target);
        }), C = _.length > 0 ? c(v, _[0]) : !a.current.noIsolation;
        C && v.cancelable && v.preventDefault();
      }
    }
  }, []), d = i.useCallback(function(g, v, b, y) {
    var _ = { name: g, delta: v, target: b, should: y, shadowParent: Pu(b) };
    t.current.push(_), setTimeout(function() {
      t.current = t.current.filter(function(C) {
        return C !== _;
      });
    }, 1);
  }, []), f = i.useCallback(function(g) {
    n.current = Vt(g), r.current = void 0;
  }, []), m = i.useCallback(function(g) {
    d(g.type, io(g), g.target, c(g, e.lockRef.current));
  }, []), h = i.useCallback(function(g) {
    d(g.type, Vt(g), g.target, c(g, e.lockRef.current));
  }, []);
  i.useEffect(function() {
    return vt.push(s), e.setCallbacks({
      onScrollCapture: m,
      onWheelCapture: m,
      onTouchMoveCapture: h
    }), document.addEventListener("wheel", l, gt), document.addEventListener("touchmove", l, gt), document.addEventListener("touchstart", f, gt), function() {
      vt = vt.filter(function(g) {
        return g !== s;
      }), document.removeEventListener("wheel", l, gt), document.removeEventListener("touchmove", l, gt), document.removeEventListener("touchstart", f, gt);
    };
  }, []);
  var p = e.removeScrollBar, w = e.inert;
  return i.createElement(
    i.Fragment,
    null,
    w ? i.createElement(s, { styles: Ru(o) }) : null,
    p ? i.createElement(bu, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Pu(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Mu = iu(Ms, Au);
var hr = i.forwardRef(function(e, t) {
  return i.createElement(vn, Oe({}, e, { ref: t, sideCar: Mu }));
});
hr.classNames = vn.classNames;
var wn = "Popover", [$s] = an(wn, [
  pn
]), It = pn(), [Ou, st] = $s(wn), Fs = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    modal: a = !1
  } = e, c = It(t), l = i.useRef(null), [d, f] = i.useState(!1), [m, h] = ur({
    prop: r,
    defaultProp: o ?? !1,
    onChange: s,
    caller: wn
  });
  return /* @__PURE__ */ u(fs, { ...c, children: /* @__PURE__ */ u(
    Ou,
    {
      scope: t,
      contentId: Rt(),
      triggerRef: l,
      open: m,
      onOpenChange: h,
      onOpenToggle: i.useCallback(() => h((p) => !p), [h]),
      hasCustomAnchor: d,
      onCustomAnchorAdd: i.useCallback(() => f(!0), []),
      onCustomAnchorRemove: i.useCallback(() => f(!1), []),
      modal: a,
      children: n
    }
  ) });
};
Fs.displayName = wn;
var Bs = "PopoverAnchor", Iu = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = st(Bs, n), s = It(n), { onCustomAnchorAdd: a, onCustomAnchorRemove: c } = o;
    return i.useEffect(() => (a(), () => c()), [a, c]), /* @__PURE__ */ u(dr, { ...s, ...r, ref: t });
  }
);
Iu.displayName = Bs;
var zs = "PopoverTrigger", js = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = st(zs, n), s = It(n), a = Se(t, o.triggerRef), c = /* @__PURE__ */ u(
      we.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Gs(o.open),
        ...r,
        ref: a,
        onClick: ae(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? c : /* @__PURE__ */ u(dr, { asChild: !0, ...s, children: c });
  }
);
js.displayName = zs;
var gr = "PopoverPortal", [Tu, Du] = $s(gr, {
  forceMount: void 0
}), Hs = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, s = st(gr, t);
  return /* @__PURE__ */ u(Tu, { scope: t, forceMount: n, children: /* @__PURE__ */ u(ot, { present: n || s.open, children: /* @__PURE__ */ u(mn, { asChild: !0, container: o, children: r }) }) });
};
Hs.displayName = gr;
var Et = "PopoverContent", Vs = i.forwardRef(
  (e, t) => {
    const n = Du(Et, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, s = st(Et, e.__scopePopover);
    return /* @__PURE__ */ u(ot, { present: r || s.open, children: s.modal ? /* @__PURE__ */ u(Fu, { ...o, ref: t }) : /* @__PURE__ */ u(Bu, { ...o, ref: t }) });
  }
);
Vs.displayName = Et;
var $u = /* @__PURE__ */ Hd("PopoverContent.RemoveScroll"), Fu = i.forwardRef(
  (e, t) => {
    const n = st(Et, e.__scopePopover), r = i.useRef(null), o = Se(t, r), s = i.useRef(!1);
    return i.useEffect(() => {
      const a = r.current;
      if (a) return Ls(a);
    }, []), /* @__PURE__ */ u(hr, { as: $u, allowPinchZoom: !0, children: /* @__PURE__ */ u(
      Ws,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: ae(e.onCloseAutoFocus, (a) => {
          a.preventDefault(), s.current || n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: ae(
          e.onPointerDownOutside,
          (a) => {
            const c = a.detail.originalEvent, l = c.button === 0 && c.ctrlKey === !0, d = c.button === 2 || l;
            s.current = d;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: ae(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), Bu = i.forwardRef(
  (e, t) => {
    const n = st(Et, e.__scopePopover), r = i.useRef(!1), o = i.useRef(!1);
    return /* @__PURE__ */ u(
      Ws,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (s) => {
          e.onCloseAutoFocus?.(s), s.defaultPrevented || (r.current || n.triggerRef.current?.focus(), s.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (s) => {
          e.onInteractOutside?.(s), s.defaultPrevented || (r.current = !0, s.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const a = s.target;
          n.triggerRef.current?.contains(a) && s.preventDefault(), s.detail.originalEvent.type === "focusin" && o.current && s.preventDefault();
        }
      }
    );
  }
), Ws = i.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: a,
      onEscapeKeyDown: c,
      onPointerDownOutside: l,
      onFocusOutside: d,
      onInteractOutside: f,
      ...m
    } = e, h = st(Et, n), p = It(n);
    return Ss(), /* @__PURE__ */ u(
      mr,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: s,
        children: /* @__PURE__ */ u(
          cn,
          {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onInteractOutside: f,
            onEscapeKeyDown: c,
            onPointerDownOutside: l,
            onFocusOutside: d,
            onDismiss: () => h.onOpenChange(!1),
            children: /* @__PURE__ */ u(
              ps,
              {
                "data-state": Gs(h.open),
                role: "dialog",
                id: h.contentId,
                ...p,
                ...m,
                ref: t,
                style: {
                  ...m.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }
), qs = "PopoverClose", zu = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = st(qs, n);
    return /* @__PURE__ */ u(
      we.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: ae(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
zu.displayName = qs;
var ju = "PopoverArrow", Hu = i.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = It(n);
    return /* @__PURE__ */ u(ms, { ...o, ...r, ref: t });
  }
);
Hu.displayName = ju;
function Gs(e) {
  return e ? "open" : "closed";
}
var Vu = Fs, Wu = js, qu = Hs, Us = Vs;
const Gu = Vu, Uu = Wu, Zs = i.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, o) => /* @__PURE__ */ u(qu, { children: /* @__PURE__ */ u(
  Us,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: De(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
      e
    ),
    ...r
  }
) }));
Zs.displayName = Us.displayName;
const Zu = "_anchor_1ppsi_1", Yu = "_popover_1ppsi_6", co = {
  anchor: Zu,
  popover: Yu
}, Xu = (e = "bottom") => {
  const [t, n] = e.split("-");
  return { side: t, align: n ?? "center" };
}, sh = ({
  children: e,
  placement: t = "bottom",
  target: n,
  className: r,
  isOpen: o,
  toggle: s,
  onOpenChange: a
}) => {
  const [c, l] = B(!1), [d, f] = B(null), m = o ?? c, { side: h, align: p } = qe(() => Xu(t), [t]), w = Q(() => {
    f(n.current?.getBoundingClientRect() ?? null);
  }, [n]), g = Q(
    (v) => {
      o === void 0 && l(v), a?.(v);
    },
    [o, a]
  );
  return ue(() => {
    const v = n.current;
    if (!v)
      return;
    const b = () => {
      w(), g(!m), s?.();
    };
    return v.addEventListener("click", b), window.addEventListener("scroll", w, !0), window.addEventListener("resize", w), () => {
      v.removeEventListener("click", b), window.removeEventListener("scroll", w, !0), window.removeEventListener("resize", w);
    };
  }, [m, g, n, s, w]), /* @__PURE__ */ N(Gu, { open: m, onOpenChange: g, children: [
    /* @__PURE__ */ u(Uu, { asChild: !0, children: /* @__PURE__ */ u(
      "span",
      {
        className: co.anchor,
        style: d ? { left: d.left, top: d.top, width: d.width, height: d.height } : void 0
      }
    ) }),
    /* @__PURE__ */ u(Zs, { side: h, align: p, className: M(co.popover, r), children: e })
  ] });
}, Ku = "_emptyComponent_1hfbh_1", Qu = "_svgWrapper_1hfbh_11", Ju = "_title_1hfbh_23", e1 = "_subtitle_1hfbh_28", Wt = {
  emptyComponent: Ku,
  svgWrapper: Qu,
  title: Ju,
  subtitle: e1
}, bn = ({
  svg: e = /* @__PURE__ */ u(Li, {}),
  title: t = "Нет данных для отображения",
  subtitle: n,
  content: r,
  className: o
}) => /* @__PURE__ */ N("div", { className: M(Wt.emptyComponent, o), children: [
  /* @__PURE__ */ u("div", { className: Wt.svgWrapper, children: e }),
  t && /* @__PURE__ */ u("span", { className: Wt.title, children: t }),
  n && /* @__PURE__ */ u("span", { className: Wt.subtitle, children: n }),
  r && r
] }), t1 = "_container_2igm5_1", n1 = "_header_2igm5_6", r1 = "_header_icon_2igm5_14", o1 = "_iconTransition_2igm5_20", s1 = "_rotateIcon_2igm5_23", i1 = "_content_2igm5_26", a1 = "_padding_2igm5_31", Pe = {
  container: t1,
  header: n1,
  header_icon: r1,
  iconTransition: o1,
  rotateIcon: s1,
  content: i1,
  padding: a1
}, c1 = ({
  header: e,
  className: t,
  content: n,
  onToggle: r,
  isOpen: o,
  defaultOpen: s = !1,
  id: a,
  headerClassName: c,
  contentClassName: l,
  iconClassName: d
}) => {
  const [f, m] = B(s), h = ve(!1), p = typeof o == "boolean" ? o : f, w = ve(null), g = typeof e == "string" ? /* @__PURE__ */ u("div", { className: Pe.header_text, children: /* @__PURE__ */ u("span", { children: e }) }) : e, v = typeof n == "string" ? /* @__PURE__ */ u("span", { className: Pe.content_text, children: n }) : n;
  ue(() => {
    const y = w.current;
    if (y) {
      if (!h.current) {
        y.style.height = s ? "auto" : "0px", h.current = !0;
        return;
      }
      if (p) {
        y.style.height = `${y.scrollHeight}px`;
        const _ = () => {
          y.style.height = "auto";
        };
        y.addEventListener("transitionend", _, { once: !0 });
      } else
        y.style.height = `${y.scrollHeight}px`, requestAnimationFrame(() => {
          y.style.height = "0px";
        });
    }
  }, [p, s]);
  const b = Q(
    (y) => {
      y.stopPropagation(), r ? r() : m((_) => !_);
    },
    [r]
  );
  return /* @__PURE__ */ N("div", { className: M(Pe.container, t), id: a, children: [
    /* @__PURE__ */ N("div", { className: M(Pe.header, c), children: [
      g,
      /* @__PURE__ */ u("div", { className: M(Pe.header_icon, d), onClick: b, children: /* @__PURE__ */ u(
        Qn,
        {
          className: M(Pe.iconArrow, Pe.iconTransition, { [Pe.rotateIcon]: p })
        }
      ) })
    ] }),
    /* @__PURE__ */ u("div", { className: M(Pe.content, l, { [Pe.padding]: p }), ref: w, children: v })
  ] });
}, l1 = "_collapsableBlock_osra3_1", d1 = "_header_osra3_6", u1 = "_headerWithInfoTooltip_osra3_12", f1 = "_infoIcon_osra3_20", qt = {
  collapsableBlock: l1,
  header: d1,
  headerWithInfoTooltip: u1,
  infoIcon: f1
}, ih = i.memo((e) => {
  const { id: t, header: n, content: r, className: o, infoTooltipContent: s, ...a } = e, [c, l] = B(!1), d = () => l(!c);
  return /* @__PURE__ */ u(
    c1,
    {
      id: t,
      className: M(qt.collapsableBlock, o),
      header: s ? /* @__PURE__ */ N("div", { className: qt.headerWithInfoTooltip, children: [
        /* @__PURE__ */ u("span", { children: n }),
        /* @__PURE__ */ u(Ri, { className: qt.infoIcon, id: "CollapsableBlockNewInfoTooltipIcon" }),
        /* @__PURE__ */ u(
          Id,
          {
            autohide: !1,
            delay: { show: 0, hide: 500 },
            isOpen: c,
            placement: "left-start",
            target: "CollapsableBlockNewInfoTooltipIcon",
            toggle: d,
            children: s
          }
        )
      ] }) : n,
      content: r,
      headerClassName: qt.header,
      ...a
    }
  );
});
var p1 = typeof document < "u", m1 = function() {
}, Zn = p1 ? Xn : m1;
const h1 = {
  ...i
}, g1 = h1.useInsertionEffect, v1 = g1 || ((e) => e());
function w1(e) {
  const t = i.useRef(() => {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return v1(() => {
    t.current = e;
  }), i.useCallback(function() {
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
      r[o] = arguments[o];
    return t.current == null ? void 0 : t.current(...r);
  }, []);
}
const b1 = {
  ...i
};
let lo = !1, _1 = 0;
const uo = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + _1++
);
function y1() {
  const [e, t] = i.useState(() => lo ? uo() : void 0);
  return Zn(() => {
    e == null && t(uo());
  }, []), i.useEffect(() => {
    lo = !0;
  }, []), e;
}
const C1 = b1.useId, x1 = C1 || y1;
let Yn;
process.env.NODE_ENV !== "production" && (Yn = /* @__PURE__ */ new Set());
function E1() {
  for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  const o = "Floating UI: " + n.join(" ");
  if (!((e = Yn) != null && e.has(o))) {
    var s;
    (s = Yn) == null || s.add(o), console.error(o);
  }
}
function k1() {
  const e = /* @__PURE__ */ new Map();
  return {
    emit(t, n) {
      var r;
      (r = e.get(t)) == null || r.forEach((o) => o(n));
    },
    on(t, n) {
      e.has(t) || e.set(t, /* @__PURE__ */ new Set()), e.get(t).add(n);
    },
    off(t, n) {
      var r;
      (r = e.get(t)) == null || r.delete(n);
    }
  };
}
const S1 = /* @__PURE__ */ i.createContext(null), N1 = /* @__PURE__ */ i.createContext(null), R1 = () => {
  var e;
  return ((e = i.useContext(S1)) == null ? void 0 : e.id) || null;
}, L1 = () => i.useContext(N1);
function A1(e) {
  const {
    open: t = !1,
    onOpenChange: n,
    elements: r
  } = e, o = x1(), s = i.useRef({}), [a] = i.useState(() => k1()), c = R1() != null;
  if (process.env.NODE_ENV !== "production") {
    const p = r.reference;
    p && !ge(p) && E1("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
  }
  const [l, d] = i.useState(r.reference), f = w1((p, w, g) => {
    s.current.openEvent = p ? w : void 0, a.emit("openchange", {
      open: p,
      event: w,
      reason: g,
      nested: c
    }), n?.(p, w, g);
  }), m = i.useMemo(() => ({
    setPositionReference: d
  }), []), h = i.useMemo(() => ({
    reference: l || r.reference || null,
    floating: r.floating || null,
    domReference: r.reference
  }), [l, r.reference, r.floating]);
  return i.useMemo(() => ({
    dataRef: s,
    open: t,
    onOpenChange: f,
    elements: h,
    events: a,
    floatingId: o,
    refs: m
  }), [t, f, h, a, o, m]);
}
function P1(e) {
  e === void 0 && (e = {});
  const {
    nodeId: t
  } = e, n = A1({
    ...e,
    elements: {
      reference: null,
      floating: null,
      ...e.elements
    }
  }), r = e.rootContext || n, o = r.elements, [s, a] = i.useState(null), [c, l] = i.useState(null), f = o?.domReference || s, m = i.useRef(null), h = L1();
  Zn(() => {
    f && (m.current = f);
  }, [f]);
  const p = Qo({
    ...e,
    elements: {
      ...o,
      ...c && {
        reference: c
      }
    }
  }), w = i.useCallback((_) => {
    const C = ge(_) ? {
      getBoundingClientRect: () => _.getBoundingClientRect(),
      getClientRects: () => _.getClientRects(),
      contextElement: _
    } : _;
    l(C), p.refs.setReference(C);
  }, [p.refs]), g = i.useCallback((_) => {
    (ge(_) || _ === null) && (m.current = _, a(_)), (ge(p.refs.reference.current) || p.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    _ !== null && !ge(_)) && p.refs.setReference(_);
  }, [p.refs]), v = i.useMemo(() => ({
    ...p.refs,
    setReference: g,
    setPositionReference: w,
    domReference: m
  }), [p.refs, g, w]), b = i.useMemo(() => ({
    ...p.elements,
    domReference: f
  }), [p.elements, f]), y = i.useMemo(() => ({
    ...p,
    ...r,
    refs: v,
    elements: b,
    nodeId: t
  }), [p, v, b, t, r]);
  return Zn(() => {
    r.dataRef.current.floatingContext = y;
    const _ = h?.nodesRef.current.find((C) => C.id === t);
    _ && (_.context = y);
  }), i.useMemo(() => ({
    ...p,
    context: y,
    refs: v,
    elements: b
  }), [p, v, b, y]);
}
const M1 = "_errorCaption_17ftc_1", O1 = "_fullWidth_17ftc_27", fo = {
  errorCaption: M1,
  fullWidth: O1
}, vr = ({
  children: e,
  isFullWidth: t
}) => /* @__PURE__ */ u("p", { className: M(fo.errorCaption, { [fo.fullWidth]: t }), children: e });
var I1 = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], T1 = I1.reduce((e, t) => {
  const n = /* @__PURE__ */ bo(`Primitive.${t}`), r = i.forwardRef((o, s) => {
    const { asChild: a, ...c } = o, l = a ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u(l, { ...c, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), D1 = "Label", Ys = i.forwardRef((e, t) => /* @__PURE__ */ u(
  T1.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      n.target.closest("button, input, select, textarea") || (e.onMouseDown?.(n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
Ys.displayName = D1;
var Xs = Ys;
const $1 = Co(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
), Ks = i.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(Xs, { ref: n, className: De($1(), e), ...t }));
Ks.displayName = Xs.displayName;
const F1 = "_label_1e3cu_1", B1 = "_label__text_1e3cu_11", po = {
  label: F1,
  label__text: B1
}, wr = ({ htmlFor: e, children: t, className: n }) => /* @__PURE__ */ u(Ks, { htmlFor: e, className: M(po.label, n), children: typeof t == "string" ? /* @__PURE__ */ u("div", { className: po.label__text, children: t }) : t }), z1 = "_wrapper_1yed1_1", j1 = "_wrapper_small_1yed1_14", H1 = "_iconCross_1yed1_17", V1 = "_iconCross_small_1yed1_25", Gt = {
  wrapper: z1,
  wrapper_small: j1,
  iconCross: H1,
  iconCross_small: V1
}, W1 = sn(({ className: e, children: t, onClick: n, isSmall: r }) => /* @__PURE__ */ N("div", { className: M(Gt.wrapper, e, r && Gt.wrapper_small), children: [
  /* @__PURE__ */ u("span", { children: t }),
  n && /* @__PURE__ */ u(
    dt,
    {
      className: M(Gt.iconCross, { [Gt.iconCross_small]: r }),
      onClick: (o) => {
        o.stopPropagation(), n();
      }
    }
  )
] })), q1 = "_wrapper_18b7f_1", G1 = "_container_18b7f_5", U1 = "_input_18b7f_5", Z1 = "_error_18b7f_17", Y1 = "_disabled_18b7f_20", X1 = "_tagContainer_18b7f_33", K1 = "_selectedOptionContainer_18b7f_38", Q1 = "_selectedOption_18b7f_38", J1 = "_placeHolder_18b7f_49", ef = "_iconContainer_18b7f_53", tf = "_deleteIcon_18b7f_59", nf = "_divider_18b7f_79", rf = "_arrowIcon_18b7f_88", of = "_arrowIconExpanded_18b7f_103", sf = "_dropdown_18b7f_107", af = "_dropdown_visible_18b7f_118", cf = "_withSearch_18b7f_133", lf = "_search_18b7f_136", df = "_search__icon_18b7f_149", uf = "_search__input_18b7f_154", ff = "_option_18b7f_184", pf = "_option_active_18b7f_192", mf = "_option_active_next_active_18b7f_198", hf = "_option_active_prev_active_18b7f_202", gf = "_tableTemplate_18b7f_229", vf = "_tableContainer_18b7f_236", wf = "_table_18b7f_229", bf = "_activeRow_18b7f_278", _f = "_checkboxCell_18b7f_285", yf = "_checkbox_18b7f_285", Cf = "_footerTotal_18b7f_300", Z = {
  wrapper: q1,
  container: G1,
  input: U1,
  error: Z1,
  disabled: Y1,
  tagContainer: X1,
  selectedOptionContainer: K1,
  selectedOption: Q1,
  placeHolder: J1,
  iconContainer: ef,
  deleteIcon: tf,
  divider: nf,
  arrowIcon: rf,
  arrowIconExpanded: of,
  dropdown: sf,
  dropdown_visible: af,
  withSearch: cf,
  search: lf,
  search__icon: df,
  search__input: uf,
  option: ff,
  option_active: pf,
  option_active_next_active: mf,
  option_active_prev_active: hf,
  tableTemplate: gf,
  tableContainer: vf,
  table: wf,
  activeRow: bf,
  checkboxCell: _f,
  checkbox: yf,
  footerTotal: Cf
}, xf = 6, Ef = ({
  value: e,
  selectedOptionRender: t,
  tagRender: n,
  onDelete: r
}) => e ? Array.isArray(e) ? /* @__PURE__ */ u("div", { className: Z.tagContainer, children: e.map(
  (o, s) => n ? /* @__PURE__ */ u(on.Fragment, { children: n(o) }, s) : /* @__PURE__ */ u(
    W1,
    {
      isSmall: !0,
      ...r && {
        onClick: () => r?.(o)
      },
      children: o.label
    },
    s
  )
) }) : /* @__PURE__ */ u("span", { className: Z.selectedOption, children: t ? t(e) : e.label }) : null, Qs = ({
  onSearch: e,
  searchClassName: t,
  searchValue: n,
  isLoading: r,
  placeholder: o
}) => /* @__PURE__ */ N("div", { className: M(Z.search, t), children: [
  /* @__PURE__ */ u(Kn, { className: Z.search__icon }),
  /* @__PURE__ */ u(
    "input",
    {
      className: Z.search__input,
      value: n,
      onChange: (s) => e?.(s.target.value),
      placeholder: o
    }
  ),
  r && /* @__PURE__ */ u(wt, { size: "extraSmall", className: Z.search__spinner })
] }), kf = ({
  value: e,
  options: t,
  optionClassName: n,
  optionRender: r,
  onChange: o,
  onSearch: s,
  searchClassName: a,
  isLoading: c,
  searchValue: l,
  searchPlaceholder: d
}) => {
  const f = (m) => Array.isArray(e) ? e.some((h) => h.value === m.value) : e?.value === m.value;
  return /* @__PURE__ */ N(Je, { children: [
    s && /* @__PURE__ */ u(
      Qs,
      {
        onSearch: s,
        searchValue: l,
        searchClassName: a,
        isLoading: c,
        placeholder: d
      }
    ),
    t && t.length ? /* @__PURE__ */ u("ul", { className: M({ [Z.withSearch]: s }), children: t.map((m, h) => {
      const p = f(m), w = t[h - 1] && f(t[h - 1]), g = t[h + 1] && f(t[h + 1]);
      return /* @__PURE__ */ u(
        "li",
        {
          className: M(
            Z.option,
            {
              [Z.option_active]: p,
              [Z.option_active_prev_active]: w,
              [Z.option_active_next_active]: g
            },
            n
          ),
          onClick: () => o(m),
          children: r ? r(m) : m.label
        },
        `${m.value}${h}`
      );
    }) }) : !c && /* @__PURE__ */ u(bn, {})
  ] });
}, Sf = ({
  value: e,
  options: t,
  onChange: n,
  onDelete: r,
  onSearch: o,
  searchClassName: s,
  isLoading: a,
  searchValue: c,
  searchPlaceholder: l,
  columns: d,
  total: f,
  mode: m
}) => {
  const h = (v) => Array.isArray(e) ? e.some((b) => b.value === v.value) : e?.value === v.value, p = (v, b) => {
    if (m === "multiple" && b && r) {
      r(v);
      return;
    }
    n(v);
  }, w = f ?? t?.length ?? 0, g = d ?? [];
  return /* @__PURE__ */ N("div", { className: Z.tableTemplate, children: [
    o && /* @__PURE__ */ u(
      Qs,
      {
        onSearch: o,
        searchValue: c,
        searchClassName: s,
        isLoading: a,
        placeholder: l
      }
    ),
    /* @__PURE__ */ u("div", { className: Z.tableContainer, children: t && t.length ? /* @__PURE__ */ N("table", { className: Z.table, children: [
      /* @__PURE__ */ u("thead", { children: /* @__PURE__ */ N("tr", { children: [
        /* @__PURE__ */ u("th", { className: Z.checkboxCell, "aria-label": "" }),
        g.map((v) => /* @__PURE__ */ u("th", { className: v.className, children: v.title }, v.key))
      ] }) }),
      /* @__PURE__ */ u("tbody", { children: t.map((v, b) => {
        const y = h(v);
        return /* @__PURE__ */ N(
          "tr",
          {
            className: M({ [Z.activeRow]: y }),
            onClick: () => p(v, y),
            children: [
              /* @__PURE__ */ u("td", { className: Z.checkboxCell, children: /* @__PURE__ */ u(
                "input",
                {
                  type: "checkbox",
                  className: Z.checkbox,
                  checked: y,
                  readOnly: !0,
                  tabIndex: -1,
                  onClick: (_) => _.stopPropagation(),
                  onChange: () => p(v, y)
                }
              ) }),
              g.map((_) => /* @__PURE__ */ u("td", { className: _.className, children: _.render(v) }, _.key))
            ]
          },
          `${String(v.value)}${b}`
        );
      }) })
    ] }) : !a && /* @__PURE__ */ u(bn, {}) }),
    /* @__PURE__ */ N("div", { className: Z.footerTotal, children: [
      "Всего ",
      w
    ] })
  ] });
}, ah = ({
  options: e,
  value: t,
  mode: n,
  placeholder: r,
  onChange: o,
  dropdownRender: s,
  optionRender: a,
  selectedOptionRender: c,
  dropdownIcon: l,
  tagRender: d,
  dropDownClassName: f,
  optionClassName: m,
  inputClassName: h,
  deleteIconClassName: p,
  onDelete: w,
  onClear: g,
  label: v,
  onSearch: b,
  searchClassName: y,
  searchPlaceholder: _,
  isLoading: C,
  disabled: E,
  onClose: x,
  portalTarget: S,
  error: k,
  fixedHeight: I = !0,
  template: $ = "list",
  columns: j,
  total: W
}) => {
  const [H, V] = B(!1), [X, F] = B(!1), q = ve(null), P = ve(null), K = ve(null), [R, fe] = B(""), pe = S ?? (X && typeof document < "u" ? document.body : void 0);
  ue(() => {
    F(!0);
  }, []);
  const oe = Q(
    (U) => {
      fe(U), b?.(U);
    },
    [b]
  );
  ue(() => {
    if (!H)
      return;
    const U = (se) => {
      q.current && !q.current.contains(se.target) && (!P.current || !P.current.contains(se.target)) && (oe(""), V(!1), x?.());
    };
    return document.addEventListener("mousedown", U, !0), () => {
      document.removeEventListener("mousedown", U, !0);
    };
  }, [oe, H, x]);
  const { refs: ce, floatingStyles: G, update: te } = P1({
    strategy: "absolute",
    placement: "bottom-start",
    open: H,
    whileElementsMounted: (U, se, Fe) => Xo(U, se, Fe, {
      ancestorScroll: !1,
      elementResize: !0,
      ancestorResize: !0,
      layoutShift: !0
    }),
    middleware: [
      Jo(xf),
      es({
        fallbackPlacements: ["top-start", "bottom-start"]
      }),
      ts({
        apply({ rects: U, elements: se }) {
          const Fe = `${Math.round(U.reference.width)}px`;
          se.floating.style.width !== Fe && (se.floating.style.width = Fe);
        }
      })
    ]
  }), me = Q(
    (U) => {
      K.current = U, ce.setReference(U);
    },
    [ce]
  ), D = Q(
    (U) => {
      P.current = U, ce.setFloating(U);
    },
    [ce]
  );
  ue(() => {
    H && te();
  }, [H, te]);
  const Y = Q(
    (U) => {
      o?.(U), oe(""), x?.(), n === "single" && V(!1);
    },
    [oe, n, o, x]
  ), Ce = Q(() => {
    const U = /* @__PURE__ */ u(
      "div",
      {
        ref: D,
        className: M(Z.dropdown, { [Z.dropdown_visible]: H }, f),
        style: G,
        onClick: (se) => se.stopPropagation(),
        children: /* @__PURE__ */ u("div", { className: Z.dropdownContent, style: { height: I ? "300px" : "none" }, children: (() => {
          const se = $ === "table" ? /* @__PURE__ */ u(
            Sf,
            {
              value: t,
              options: e,
              onChange: Y,
              onDelete: w,
              ...b && { onSearch: oe },
              searchClassName: y,
              isLoading: C,
              searchValue: R,
              searchPlaceholder: _,
              columns: j,
              total: W,
              mode: n
            }
          ) : /* @__PURE__ */ u(
            kf,
            {
              value: t,
              options: e,
              optionClassName: m,
              optionRender: a,
              onChange: Y,
              ...b && { onSearch: oe },
              searchClassName: y,
              isLoading: C,
              searchValue: R,
              searchPlaceholder: _
            }
          );
          return s ? s(se) : se;
        })() })
      }
    );
    return pe ? go.createPortal(U, pe) : U;
  }, [
    f,
    s,
    I,
    G,
    Y,
    oe,
    C,
    H,
    b,
    m,
    a,
    e,
    pe,
    $,
    j,
    W,
    n,
    w,
    y,
    _,
    R,
    D,
    t
  ]), Re = qe(
    () => X ? Ce() : null,
    [X, Ce]
  ), Ne = Array.isArray(t) ? !!t.length : !!t;
  return /* @__PURE__ */ N("div", { className: Z.wrapper, children: [
    v && /* @__PURE__ */ u(wr, { htmlFor: "CustomSelectInput", children: v }),
    /* @__PURE__ */ N("div", { className: Z.container, ref: q, children: [
      /* @__PURE__ */ N(
        "div",
        {
          role: "button",
          id: "CustomSelectInput",
          tabIndex: 0,
          ref: me,
          className: M(
            Z.input,
            { [Z.input_fixedHeight]: n === "single", [Z.disabled]: E },
            k && Z.error,
            h
          ),
          onClick: () => {
            t && (oe(""), x?.()), V((U) => !U);
          },
          children: [
            /* @__PURE__ */ u("div", { className: Z.selectedOptionContainer, children: Ne ? /* @__PURE__ */ u(
              Ef,
              {
                value: t,
                selectedOptionRender: c,
                tagRender: d,
                onDelete: w
              }
            ) : /* @__PURE__ */ u("span", { className: Z.placeHolder, children: r }) }),
            /* @__PURE__ */ N("div", { className: Z.iconContainer, children: [
              g && Ne && /* @__PURE__ */ N(Je, { children: [
                /* @__PURE__ */ u(
                  he,
                  {
                    variant: "text",
                    className: M(Z.deleteIcon, p),
                    onClick: (U) => {
                      U.stopPropagation(), g();
                    },
                    children: /* @__PURE__ */ u("span", { children: /* @__PURE__ */ u(dt, {}) })
                  }
                ),
                /* @__PURE__ */ u("div", { className: Z.divider, children: /* @__PURE__ */ u("div", {}) })
              ] }),
              l || /* @__PURE__ */ u(
                he,
                {
                  variant: "text",
                  className: M(Z.arrowIcon, {
                    [Z.arrowIconExpanded]: H
                  }),
                  children: /* @__PURE__ */ u(Qn, {})
                }
              )
            ] })
          ]
        }
      ),
      Re
    ] }),
    k && /* @__PURE__ */ u(vr, { children: k })
  ] });
};
// @__NO_SIDE_EFFECTS__
function Nf(e) {
  const t = /* @__PURE__ */ Rf(e), n = i.forwardRef((r, o) => {
    const { children: s, ...a } = r, c = i.Children.toArray(s), l = c.find(Af);
    if (l) {
      const d = l.props.children, f = c.map((m) => m === l ? i.Children.count(d) > 1 ? i.Children.only(null) : i.isValidElement(d) ? d.props.children : null : m);
      return /* @__PURE__ */ u(t, { ...a, ref: o, children: i.isValidElement(d) ? i.cloneElement(d, void 0, f) : null });
    }
    return /* @__PURE__ */ u(t, { ...a, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Rf(e) {
  const t = i.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (i.isValidElement(o)) {
      const a = Mf(o), c = Pf(s, o.props);
      return o.type !== i.Fragment && (c.ref = r ? Pt(r, a) : a), i.cloneElement(o, c);
    }
    return i.Children.count(o) > 1 ? i.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Lf = /* @__PURE__ */ Symbol("radix.slottable");
function Af(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Lf;
}
function Pf(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...c) => {
      const l = s(...c);
      return o(...c), l;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Mf(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var _n = "Dialog", [Js] = an(_n), [Of, Ae] = Js(_n), ei = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: s,
    modal: a = !0
  } = e, c = i.useRef(null), l = i.useRef(null), [d, f] = ur({
    prop: r,
    defaultProp: o ?? !1,
    onChange: s,
    caller: _n
  });
  return /* @__PURE__ */ u(
    Of,
    {
      scope: t,
      triggerRef: c,
      contentRef: l,
      contentId: Rt(),
      titleId: Rt(),
      descriptionId: Rt(),
      open: d,
      onOpenChange: f,
      onOpenToggle: i.useCallback(() => f((m) => !m), [f]),
      modal: a,
      children: n
    }
  );
};
ei.displayName = _n;
var ti = "DialogTrigger", If = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ae(ti, n), s = Se(t, o.triggerRef);
    return /* @__PURE__ */ u(
      we.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": yr(o.open),
        ...r,
        ref: s,
        onClick: ae(e.onClick, o.onOpenToggle)
      }
    );
  }
);
If.displayName = ti;
var br = "DialogPortal", [Tf, ni] = Js(br, {
  forceMount: void 0
}), ri = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, s = Ae(br, t);
  return /* @__PURE__ */ u(Tf, { scope: t, forceMount: n, children: i.Children.map(r, (a) => /* @__PURE__ */ u(ot, { present: n || s.open, children: /* @__PURE__ */ u(mn, { asChild: !0, container: o, children: a }) })) });
};
ri.displayName = br;
var rn = "DialogOverlay", oi = i.forwardRef(
  (e, t) => {
    const n = ni(rn, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, s = Ae(rn, e.__scopeDialog);
    return s.modal ? /* @__PURE__ */ u(ot, { present: r || s.open, children: /* @__PURE__ */ u($f, { ...o, ref: t }) }) : null;
  }
);
oi.displayName = rn;
var Df = /* @__PURE__ */ Nf("DialogOverlay.RemoveScroll"), $f = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ae(rn, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ u(hr, { as: Df, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ u(
        we.div,
        {
          "data-state": yr(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), ft = "DialogContent", si = i.forwardRef(
  (e, t) => {
    const n = ni(ft, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, s = Ae(ft, e.__scopeDialog);
    return /* @__PURE__ */ u(ot, { present: r || s.open, children: s.modal ? /* @__PURE__ */ u(Ff, { ...o, ref: t }) : /* @__PURE__ */ u(Bf, { ...o, ref: t }) });
  }
);
si.displayName = ft;
var Ff = i.forwardRef(
  (e, t) => {
    const n = Ae(ft, e.__scopeDialog), r = i.useRef(null), o = Se(t, n.contentRef, r);
    return i.useEffect(() => {
      const s = r.current;
      if (s) return Ls(s);
    }, []), /* @__PURE__ */ u(
      ii,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: ae(e.onCloseAutoFocus, (s) => {
          s.preventDefault(), n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: ae(e.onPointerDownOutside, (s) => {
          const a = s.detail.originalEvent, c = a.button === 0 && a.ctrlKey === !0;
          (a.button === 2 || c) && s.preventDefault();
        }),
        onFocusOutside: ae(
          e.onFocusOutside,
          (s) => s.preventDefault()
        )
      }
    );
  }
), Bf = i.forwardRef(
  (e, t) => {
    const n = Ae(ft, e.__scopeDialog), r = i.useRef(!1), o = i.useRef(!1);
    return /* @__PURE__ */ u(
      ii,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (s) => {
          e.onCloseAutoFocus?.(s), s.defaultPrevented || (r.current || n.triggerRef.current?.focus(), s.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (s) => {
          e.onInteractOutside?.(s), s.defaultPrevented || (r.current = !0, s.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const a = s.target;
          n.triggerRef.current?.contains(a) && s.preventDefault(), s.detail.originalEvent.type === "focusin" && o.current && s.preventDefault();
        }
      }
    );
  }
), ii = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: s, ...a } = e, c = Ae(ft, n), l = i.useRef(null), d = Se(t, l);
    return Ss(), /* @__PURE__ */ N(Je, { children: [
      /* @__PURE__ */ u(
        mr,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: s,
          children: /* @__PURE__ */ u(
            cn,
            {
              role: "dialog",
              id: c.contentId,
              "aria-describedby": c.descriptionId,
              "aria-labelledby": c.titleId,
              "data-state": yr(c.open),
              ...a,
              ref: d,
              onDismiss: () => c.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ N(Je, { children: [
        /* @__PURE__ */ u(jf, { titleId: c.titleId }),
        /* @__PURE__ */ u(Vf, { contentRef: l, descriptionId: c.descriptionId })
      ] })
    ] });
  }
), _r = "DialogTitle", ai = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ae(_r, n);
    return /* @__PURE__ */ u(we.h2, { id: o.titleId, ...r, ref: t });
  }
);
ai.displayName = _r;
var ci = "DialogDescription", li = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ae(ci, n);
    return /* @__PURE__ */ u(we.p, { id: o.descriptionId, ...r, ref: t });
  }
);
li.displayName = ci;
var di = "DialogClose", zf = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ae(di, n);
    return /* @__PURE__ */ u(
      we.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: ae(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
zf.displayName = di;
function yr(e) {
  return e ? "open" : "closed";
}
var ui = "DialogTitleWarning", [ch, fi] = Cc(ui, {
  contentName: ft,
  titleName: _r,
  docsSlug: "dialog"
}), jf = ({ titleId: e }) => {
  const t = fi(ui), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return i.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, Hf = "DialogDescriptionWarning", Vf = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${fi(Hf).contentName}}.`;
  return i.useEffect(() => {
    const o = e.current?.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, Wf = ei, qf = ri, pi = oi, mi = si, hi = ai, gi = li;
const Cr = Wf, Gf = qf, vi = i.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  pi,
  {
    ref: n,
    className: De(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t
  }
));
vi.displayName = pi.displayName;
const yn = i.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ N(Gf, { children: [
  /* @__PURE__ */ u(vi, {}),
  /* @__PURE__ */ u(
    mi,
    {
      ref: r,
      className: De(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        e
      ),
      ...n,
      children: t
    }
  )
] }));
yn.displayName = mi.displayName;
const Cn = ({ className: e, ...t }) => /* @__PURE__ */ u("div", { className: De("flex flex-col space-y-1.5 text-center sm:text-left", e), ...t });
Cn.displayName = "DialogHeader";
const xr = ({ className: e, ...t }) => /* @__PURE__ */ u(
  "div",
  {
    className: De("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e),
    ...t
  }
);
xr.displayName = "DialogFooter";
const xn = i.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  hi,
  {
    ref: n,
    className: De("text-lg font-semibold leading-none tracking-tight", e),
    ...t
  }
));
xn.displayName = hi.displayName;
const Uf = i.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  gi,
  {
    ref: n,
    className: De("text-sm text-muted-foreground", e),
    ...t
  }
));
Uf.displayName = gi.displayName;
const Zf = "_wrapper_5m37o_1", Yf = "_input_5m37o_5", Xf = "_error_5m37o_25", Kf = "_disabled_5m37o_33", Qf = "_selectedOption_5m37o_39", Jf = "_placeholder_5m37o_50", ep = "_actions_5m37o_54", tp = "_clearButton_5m37o_61", np = "_selectButton_5m37o_70", rp = "_dialogContent_5m37o_77", op = "_dialogHeader_5m37o_92", sp = "_dialogTitle_5m37o_97", ip = "_search_5m37o_104", ap = "_searchIcon_5m37o_120", cp = "_searchInput_5m37o_131", lp = "_searchSpinner_5m37o_162", dp = "_tableContainer_5m37o_166", up = "_table_5m37o_166", fp = "_activeRow_5m37o_209", pp = "_emptyState_5m37o_216", mp = "_dialogFooter_5m37o_223", hp = "_pagination_5m37o_231", gp = "_footerActions_5m37o_232", vp = "_pageInfo_5m37o_251", ne = {
  wrapper: Zf,
  input: Yf,
  error: Xf,
  disabled: Kf,
  selectedOption: Qf,
  placeholder: Jf,
  actions: ep,
  clearButton: tp,
  selectButton: np,
  dialogContent: rp,
  dialogHeader: op,
  dialogTitle: sp,
  search: ip,
  searchIcon: ap,
  searchInput: cp,
  searchSpinner: lp,
  tableContainer: dp,
  table: up,
  activeRow: fp,
  emptyState: pp,
  dialogFooter: mp,
  pagination: hp,
  footerActions: gp,
  pageInfo: vp
}, wp = 8, bp = 350, _p = ({
  value: e,
  placeholder: t,
  loadOptions: n,
  onChange: r,
  onClear: o,
  columns: s,
  label: a,
  title: c = "Поиск сотрудника",
  searchPlaceholder: l = "Введите запрос",
  selectButtonText: d = "Выбрать",
  closeButtonText: f = "Закрыть",
  manualButtonText: m = "Добавить вручную",
  onManualAdd: h,
  pageSize: p = wp,
  debounceMs: w = bp,
  disabled: g,
  error: v,
  className: b,
  inputClassName: y,
  selectedOptionRender: _
}) => {
  const [C, E] = B(!1), [x, S] = B(""), [k, I] = B(""), [$, j] = B(1), [W, H] = B([]), [V, X] = B(), [F, q] = B(!1), [P, K] = B(!1), R = ve(0), fe = qe(
    () => s ?? [
      {
        key: "label",
        title: "ФИО сотрудника",
        render: (D) => D.label
      },
      {
        key: "birthDate",
        title: "День рождения",
        render: (D) => D.meta?.birthDate ?? "—"
      }
    ],
    [s]
  ), pe = V ? Math.max(1, Math.ceil(V / p)) : void 0, oe = $ > 1, ce = pe ? $ < pe : F;
  ue(() => {
    const D = window.setTimeout(() => {
      I(x.trim()), j(1);
    }, w);
    return () => window.clearTimeout(D);
  }, [w, x]), ue(() => {
    if (!C)
      return;
    const D = R.current + 1;
    R.current = D, K(!0), n({ search: k, page: $, pageSize: p }).then((Y) => {
      R.current === D && (H(Y.options), X(Y.total), q(Y.hasNextPage ?? !1));
    }).finally(() => {
      R.current === D && K(!1);
    });
  }, [k, C, n, $, p]);
  const G = Q((D) => {
    E(D), D || (S(""), I(""), j(1));
  }, []), te = Q(
    (D) => {
      r?.(D), G(!1);
    },
    [G, r]
  ), me = e ? _ ? _(e) : e.label : t;
  return /* @__PURE__ */ N("div", { className: M(ne.wrapper, b), children: [
    a && /* @__PURE__ */ u(wr, { htmlFor: "DialogSelectInput", children: a }),
    /* @__PURE__ */ N(
      "div",
      {
        id: "DialogSelectInput",
        role: "button",
        tabIndex: g ? -1 : 0,
        className: M(ne.input, { [ne.disabled]: g, [ne.error]: v }, y),
        onClick: () => !g && G(!0),
        onKeyDown: (D) => {
          !g && (D.key === "Enter" || D.key === " ") && (D.preventDefault(), G(!0));
        },
        children: [
          /* @__PURE__ */ u("span", { className: M(ne.selectedOption, { [ne.placeholder]: !e }), children: me }),
          /* @__PURE__ */ N("span", { className: ne.actions, children: [
            o && e && /* @__PURE__ */ u(
              he,
              {
                variant: "text",
                className: ne.clearButton,
                "aria-label": "Очистить выбранное значение",
                onClick: (D) => {
                  D.stopPropagation(), o();
                },
                children: /* @__PURE__ */ u(dt, {})
              }
            ),
            /* @__PURE__ */ u(
              he,
              {
                variant: "link",
                className: ne.selectButton,
                disabled: g,
                onClick: (D) => {
                  D.stopPropagation(), G(!0);
                },
                children: d
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ u(Cr, { open: C, onOpenChange: G, children: /* @__PURE__ */ N(yn, { className: ne.dialogContent, children: [
      /* @__PURE__ */ u(Cn, { className: ne.dialogHeader, children: /* @__PURE__ */ u(xn, { className: ne.dialogTitle, children: c }) }),
      /* @__PURE__ */ N("div", { className: ne.search, children: [
        /* @__PURE__ */ u(Kn, { className: ne.searchIcon }),
        /* @__PURE__ */ u(
          "input",
          {
            className: ne.searchInput,
            value: x,
            onChange: (D) => S(D.target.value),
            placeholder: l,
            autoFocus: !0
          }
        ),
        P && /* @__PURE__ */ u(wt, { size: "extraSmall", className: ne.searchSpinner })
      ] }),
      /* @__PURE__ */ N("div", { className: ne.tableContainer, children: [
        /* @__PURE__ */ N("table", { className: ne.table, children: [
          /* @__PURE__ */ u("thead", { children: /* @__PURE__ */ u("tr", { children: fe.map((D) => /* @__PURE__ */ u("th", { className: D.className, children: D.title }, D.key)) }) }),
          /* @__PURE__ */ u("tbody", { children: W.map((D) => {
            const Y = e?.value === D.value;
            return /* @__PURE__ */ u(
              "tr",
              {
                className: M({ [ne.activeRow]: Y }),
                onClick: () => te(D),
                children: fe.map((Ce) => /* @__PURE__ */ u("td", { className: Ce.className, children: Ce.render(D) }, Ce.key))
              },
              String(D.value)
            );
          }) })
        ] }),
        !P && !W.length && /* @__PURE__ */ u("div", { className: ne.emptyState, children: /* @__PURE__ */ u(
          bn,
          {
            title: "Ничего не найдено",
            subtitle: "Попробуйте изменить поисковый запрос"
          }
        ) })
      ] }),
      /* @__PURE__ */ N(xr, { className: ne.dialogFooter, children: [
        /* @__PURE__ */ N("div", { className: ne.pagination, children: [
          /* @__PURE__ */ u(
            he,
            {
              variant: "secondary",
              size: "small",
              disabled: !oe || P,
              onClick: () => j((D) => Math.max(1, D - 1)),
              children: "Назад"
            }
          ),
          /* @__PURE__ */ N("span", { className: ne.pageInfo, children: [
            "Страница ",
            $,
            pe ? ` из ${pe}` : ""
          ] }),
          /* @__PURE__ */ u(
            he,
            {
              variant: "secondary",
              size: "small",
              disabled: !ce || P,
              onClick: () => j((D) => D + 1),
              children: "Вперёд"
            }
          )
        ] }),
        /* @__PURE__ */ N("div", { className: ne.footerActions, children: [
          h && /* @__PURE__ */ u(he, { variant: "primary", onClick: h, children: m }),
          /* @__PURE__ */ u(he, { variant: "secondary", onClick: () => G(!1), children: f })
        ] })
      ] })
    ] }) }),
    v && /* @__PURE__ */ u(vr, { children: v })
  ] });
}, yp = "_wrapper_1bg9l_1", Cp = "_input_1bg9l_5", xp = "_error_1bg9l_25", Ep = "_disabled_1bg9l_33", kp = "_selectedOption_1bg9l_39", Sp = "_placeholder_1bg9l_50", Np = "_actions_1bg9l_54", Rp = "_clearButton_1bg9l_61", Lp = "_selectButton_1bg9l_70", Ap = "_dialogContent_1bg9l_77", Pp = "_dialogHeader_1bg9l_92", Mp = "_dialogTitle_1bg9l_97", Op = "_search_1bg9l_104", Ip = "_searchIcon_1bg9l_120", Tp = "_searchInput_1bg9l_131", Dp = "_searchSpinner_1bg9l_162", $p = "_treeContainer_1bg9l_166", Fp = "_row_1bg9l_176", Bp = "_row_active_1bg9l_191", zp = "_nodeLabel_1bg9l_194", jp = "_row_match_1bg9l_198", Hp = "_chevron_1bg9l_202", Vp = "_chevronExpanded_1bg9l_227", Wp = "_chevronPlaceholder_1bg9l_231", qp = "_nodeSpinner_1bg9l_237", Gp = "_emptyState_1bg9l_249", Up = "_loadingState_1bg9l_256", Zp = "_dialogFooter_1bg9l_263", J = {
  wrapper: yp,
  input: Cp,
  error: xp,
  disabled: Ep,
  selectedOption: kp,
  placeholder: Sp,
  actions: Np,
  clearButton: Rp,
  selectButton: Lp,
  dialogContent: Ap,
  dialogHeader: Pp,
  dialogTitle: Mp,
  search: Op,
  searchIcon: Ip,
  searchInput: Tp,
  searchSpinner: Dp,
  treeContainer: $p,
  row: Fp,
  row_active: Bp,
  nodeLabel: zp,
  row_match: jp,
  chevron: Hp,
  chevronExpanded: Vp,
  chevronPlaceholder: Wp,
  nodeSpinner: qp,
  emptyState: Gp,
  loadingState: Up,
  dialogFooter: Zp
}, Yp = 350, He = "__root__", lh = ({
  value: e,
  placeholder: t,
  loadChildren: n,
  searchNodes: r,
  onChange: o,
  onClear: s,
  label: a,
  title: c = "Выбор элемента",
  searchPlaceholder: l = "Введите запрос",
  selectButtonText: d = "Выбрать",
  closeButtonText: f = "Закрыть",
  confirmButtonText: m = "Выбрать",
  debounceMs: h = Yp,
  disabled: p,
  error: w,
  className: g,
  inputClassName: v,
  selectedOptionRender: b,
  nodeRender: y
}) => {
  const [_, C] = B(!1), [E, x] = B(""), [S, k] = B(""), [I, $] = B(
    () => /* @__PURE__ */ new Map()
  ), [j, W] = B(() => /* @__PURE__ */ new Set()), [H, V] = B(() => /* @__PURE__ */ new Set()), [X, F] = B(() => /* @__PURE__ */ new Set()), [q, P] = B(() => /* @__PURE__ */ new Set()), [K, R] = B(!1), [fe, pe] = B(null), oe = ve(0), ce = ve(0);
  ue(() => {
    if (!_ || I.has(He)) return;
    const T = oe.current + 1;
    oe.current = T, W((re) => {
      const ee = new Set(re);
      return ee.add(He), ee;
    }), n({ parentId: null, search: "" }).then((re) => {
      oe.current === T && $((ee) => {
        const le = new Map(ee);
        return le.set(He, re.nodes), le;
      });
    }).finally(() => {
      oe.current === T && W((re) => {
        const ee = new Set(re);
        return ee.delete(He), ee;
      });
    });
  }, [_, n, I]), ue(() => {
    const T = window.setTimeout(() => k(E.trim()), h);
    return () => window.clearTimeout(T);
  }, [E, h]), ue(() => {
    if (!_ || !r) return;
    if (!S) {
      P(/* @__PURE__ */ new Set()), F(/* @__PURE__ */ new Set());
      return;
    }
    const T = ce.current + 1;
    ce.current = T, R(!0), r(S).then((re) => {
      if (ce.current !== T) return;
      const ee = /* @__PURE__ */ new Set(), le = /* @__PURE__ */ new Set(), be = /* @__PURE__ */ new Map();
      for (const Be of re.matches) {
        ee.add(Be.node.value);
        const _e = [...Be.path, Be.node];
        for (let de = 0; de < _e.length - 1; de++) {
          const it = _e[de], at = _e[de + 1];
          le.add(it.value);
          const ze = it.value;
          be.has(ze) || be.set(ze, /* @__PURE__ */ new Map()), be.get(ze).set(at.value, at);
        }
        if (_e.length > 0) {
          const de = _e[0];
          be.has(He) || be.set(He, /* @__PURE__ */ new Map()), be.get(He).set(de.value, de);
        }
      }
      P(ee), F(le), $((Be) => {
        const _e = new Map(Be);
        return be.forEach((de, it) => {
          const at = _e.get(it) ?? [], ze = /* @__PURE__ */ new Map();
          at.forEach((Ue) => ze.set(Ue.value, Ue)), de.forEach((Ue, yi) => ze.set(yi, Ue)), _e.set(it, Array.from(ze.values()));
        }), _e;
      });
    }).finally(() => {
      ce.current === T && R(!1);
    });
  }, [S, _, r]);
  const G = Q((T) => {
    C(T), T || (x(""), k(""), pe(null), P(/* @__PURE__ */ new Set()), F(/* @__PURE__ */ new Set()));
  }, []), te = Q(
    (T) => {
      const re = T.value;
      I.has(re) || j.has(re) || (W((ee) => {
        const le = new Set(ee);
        return le.add(re), le;
      }), n({ parentId: T.value, search: "" }).then((ee) => {
        $((le) => {
          const be = new Map(le), Be = be.get(re) ?? [], _e = /* @__PURE__ */ new Map();
          return Be.forEach((de) => _e.set(de.value, de)), ee.nodes.forEach((de) => _e.set(de.value, de)), be.set(re, Array.from(_e.values())), be;
        });
      }).finally(() => {
        W((ee) => {
          const le = new Set(ee);
          return le.delete(re), le;
        });
      }));
    },
    [I, n, j]
  ), me = Q(
    (T) => {
      V((re) => {
        const ee = new Set(re);
        return ee.has(T.value) ? ee.delete(T.value) : (ee.add(T.value), te(T)), ee;
      });
    },
    [te]
  ), D = Q((T) => {
    pe(T);
  }, []), Y = Q(() => {
    fe && o?.(fe), G(!1);
  }, [G, o, fe]), Ce = Q(
    (T) => H.has(T) || X.has(T),
    [H, X]
  ), Re = Q(
    (T) => {
      if (!S || r) return T;
      const re = S.toLowerCase();
      return T.filter((ee) => ee.label.toLowerCase().includes(re));
    },
    [S, r]
  ), Ne = (T, re) => {
    const ee = T.value, le = I.get(ee), be = Ce(T.value), Be = j.has(ee), _e = fe?.value === T.value, de = e?.value === T.value, it = q.has(T.value), at = be && le && le.length > 0, ze = at ? Re(le) : [];
    return /* @__PURE__ */ N(on.Fragment, { children: [
      /* @__PURE__ */ N(
        "div",
        {
          className: M(J.row, {
            [J.row_active]: _e || de,
            [J.row_match]: it
          }),
          style: { paddingLeft: 16 + re * 20 },
          onClick: () => D(T),
          children: [
            T.hasChildren ? /* @__PURE__ */ u(
              "button",
              {
                type: "button",
                className: M(J.chevron, { [J.chevronExpanded]: be }),
                onClick: (Ue) => {
                  Ue.stopPropagation(), me(T);
                },
                "aria-label": be ? "Свернуть" : "Раскрыть",
                children: /* @__PURE__ */ u(Qn, {})
              }
            ) : /* @__PURE__ */ u("span", { className: J.chevronPlaceholder }),
            /* @__PURE__ */ u("span", { className: J.nodeLabel, children: y ? y(T) : T.label }),
            Be && /* @__PURE__ */ u(wt, { size: "extraSmall", className: J.nodeSpinner })
          ]
        }
      ),
      at && ze.map((Ue) => Ne(Ue, re + 1))
    ] }, String(T.value));
  }, U = I.get(He) ?? [], se = Re(U), Fe = j.has(He), wi = e ? b ? b(e) : e.label : t, bi = !Fe && !K && se.length === 0, _i = qe(
    () => K || Fe && !!S,
    [K, Fe, S]
  );
  return /* @__PURE__ */ N("div", { className: M(J.wrapper, g), children: [
    a && /* @__PURE__ */ u(wr, { htmlFor: "TreeDialogSelectInput", children: a }),
    /* @__PURE__ */ N(
      "div",
      {
        id: "TreeDialogSelectInput",
        role: "button",
        tabIndex: p ? -1 : 0,
        className: M(
          J.input,
          { [J.disabled]: p, [J.error]: w },
          v
        ),
        onClick: () => !p && G(!0),
        onKeyDown: (T) => {
          !p && (T.key === "Enter" || T.key === " ") && (T.preventDefault(), G(!0));
        },
        children: [
          /* @__PURE__ */ u("span", { className: M(J.selectedOption, { [J.placeholder]: !e }), children: wi }),
          /* @__PURE__ */ N("span", { className: J.actions, children: [
            s && e && /* @__PURE__ */ u(
              he,
              {
                variant: "text",
                className: J.clearButton,
                "aria-label": "Очистить выбранное значение",
                onClick: (T) => {
                  T.stopPropagation(), s();
                },
                children: /* @__PURE__ */ u(dt, {})
              }
            ),
            /* @__PURE__ */ u(
              he,
              {
                variant: "link",
                className: J.selectButton,
                disabled: p,
                onClick: (T) => {
                  T.stopPropagation(), G(!0);
                },
                children: d
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ u(Cr, { open: _, onOpenChange: G, children: /* @__PURE__ */ N(yn, { className: J.dialogContent, children: [
      /* @__PURE__ */ u(Cn, { className: J.dialogHeader, children: /* @__PURE__ */ u(xn, { className: J.dialogTitle, children: c }) }),
      /* @__PURE__ */ N("div", { className: J.search, children: [
        /* @__PURE__ */ u(Kn, { className: J.searchIcon }),
        /* @__PURE__ */ u(
          "input",
          {
            className: J.searchInput,
            value: E,
            onChange: (T) => x(T.target.value),
            placeholder: l,
            autoFocus: !0
          }
        ),
        _i && /* @__PURE__ */ u(wt, { size: "extraSmall", className: J.searchSpinner })
      ] }),
      /* @__PURE__ */ u("div", { className: J.treeContainer, children: Fe && U.length === 0 ? /* @__PURE__ */ u("div", { className: J.loadingState, children: /* @__PURE__ */ u(wt, { size: "small" }) }) : bi ? /* @__PURE__ */ u("div", { className: J.emptyState, children: /* @__PURE__ */ u(
        bn,
        {
          title: "Ничего не найдено",
          subtitle: "Попробуйте изменить поисковый запрос"
        }
      ) }) : se.map((T) => Ne(T, 0)) }),
      /* @__PURE__ */ N(xr, { className: J.dialogFooter, children: [
        /* @__PURE__ */ u(he, { variant: "secondary", onClick: () => G(!1), children: f }),
        /* @__PURE__ */ u(he, { variant: "primary", disabled: !fe, onClick: Y, children: m })
      ] })
    ] }) }),
    w && /* @__PURE__ */ u(vr, { children: w })
  ] });
}, Xp = "_tabs_z157r_1", Kp = "_tabItem_z157r_9", Qp = "_active_z157r_40", Jp = "_before_z157r_55", em = "_after_z157r_56", Xe = {
  tabs: Xp,
  tabItem: Kp,
  active: Qp,
  before: Jp,
  after: em
}, dh = i.memo(
  ({ className: e, items: t = [], activeTab: n, onClick: r, tabsClassName: o }) => /* @__PURE__ */ u("div", { className: M(Xe.wrapper, e), children: /* @__PURE__ */ u("div", { className: M(Xe.tabs, o), children: t.map(
    (s, a) => s.title && /* @__PURE__ */ N(
      "div",
      {
        className: M(Xe.tabItem, s.className, {
          [Xe.active]: n === a,
          [Xe.first]: a === 0,
          [Xe.last]: a === t.length - 1
        }),
        style: {
          zIndex: n === a ? t.length : a === 0 ? 0 : t.length - a
        },
        onClick: (c) => {
          c.stopPropagation(), r?.(a);
        },
        children: [
          n === a && a !== 0 && /* @__PURE__ */ u("span", { className: Xe.before }),
          s.title,
          n === a && a !== t.length - 1 && /* @__PURE__ */ u("span", { className: Xe.after })
        ]
      },
      a
    )
  ) }) })
), tm = "_wrapper_1xj0t_1", nm = "_itemBlock_1xj0t_8", rm = "_step_1xj0t_16", om = "_clickable_1xj0t_39", sm = "_step_inactive_1xj0t_46", im = "_step_current_1xj0t_51", am = "_connector_1xj0t_55", cm = "_connector_active_1xj0t_62", lm = "_label_1xj0t_66", dm = "_label_active_1xj0t_74", Me = {
  wrapper: tm,
  itemBlock: nm,
  step: rm,
  clickable: om,
  step_inactive: sm,
  step_current: im,
  connector: am,
  connector_active: cm,
  label: lm,
  label_active: dm
}, uh = ({
  items: e,
  current: t,
  onChange: n,
  showCheckOnCompleted: r = !1,
  className: o
}) => {
  const s = !!n;
  return /* @__PURE__ */ u("div", { className: M(Me.wrapper, o), role: "list", children: e.map((a, c) => {
    const l = c < t, d = c === t, f = c <= t, m = c === e.length - 1, h = r && l, p = a.content ?? (h ? /* @__PURE__ */ u(vo, {}) : c + 1), w = /* @__PURE__ */ u(
      "button",
      {
        type: "button",
        className: M(Me.step, {
          [Me.step_inactive]: !f,
          [Me.step_current]: d,
          [Me.clickable]: s
        }),
        disabled: !s,
        onClick: () => n?.(c),
        "aria-current": d ? "step" : void 0,
        "aria-label": typeof a.label == "string" ? a.label : `Шаг ${c + 1}`,
        children: p
      }
    );
    return /* @__PURE__ */ N(on.Fragment, { children: [
      a.label ? /* @__PURE__ */ N("div", { className: Me.itemBlock, role: "listitem", children: [
        w,
        /* @__PURE__ */ u("span", { className: M(Me.label, { [Me.label_active]: f }), children: a.label })
      ] }) : /* @__PURE__ */ u("div", { role: "listitem", children: w }),
      !m && /* @__PURE__ */ u(
        "span",
        {
          className: M(Me.connector, { [Me.connector_active]: c < t })
        }
      )
    ] }, c);
  }) });
}, um = "_container_j5wpc_1", fm = "_tabs_j5wpc_4", pm = "_line_j5wpc_11", mm = "_tabItem_j5wpc_21", hm = "_header_j5wpc_34", gm = "_notificationChanges_j5wpc_42", vm = "_tabs_hasAnimatedIndicator_j5wpc_61", wm = "_active_j5wpc_64", Ke = {
  container: um,
  tabs: fm,
  line: pm,
  tabItem: mm,
  header: hm,
  notificationChanges: gm,
  tabs_hasAnimatedIndicator: vm,
  active: wm
}, fh = i.memo(
  ({
    items: e = [],
    activeTab: t,
    className: n,
    tabsClassName: r,
    changesIndex: o,
    badgeValue: s,
    sliderClassName: a,
    onClick: c
  }) => {
    const l = ve(null), d = ve(null), [f, m] = B({ left: 0, width: 0 });
    return ue(() => {
      const h = l.current;
      if (!h)
        return;
      const p = () => {
        const v = {
          left: h.offsetLeft || 0,
          width: h.clientWidth || 0
        };
        m(
          (b) => b.left === v.left && b.width === v.width ? b : v
        );
      }, w = () => {
        d.current && cancelAnimationFrame(d.current), d.current = requestAnimationFrame(() => {
          d.current = null, p();
        });
      };
      w();
      const g = new ResizeObserver(() => {
        w();
      });
      return g.observe(h), () => {
        g.disconnect(), d.current !== null && (cancelAnimationFrame(d.current), d.current = null);
      };
    }, [t]), /* @__PURE__ */ u("div", { className: M(Ke.container, n), children: /* @__PURE__ */ N("div", { className: M(Ke.tabs, Ke.tabs_hasAnimatedIndicator, r), children: [
      e.map(
        (h, p) => h.title && /* @__PURE__ */ N(
          "div",
          {
            ref: t === p ? l : void 0,
            className: M(Ke.tabItem, h.className, {
              [Ke.active]: t === p
            }),
            onClick: (w) => {
              w.stopPropagation(), c?.(p);
            },
            children: [
              h.header && /* @__PURE__ */ u("div", { className: Ke.header, children: h.header }),
              h.title,
              o === p && /* @__PURE__ */ u("div", { className: Ke.notificationChanges, children: s != null ? s > 99 ? "99+" : String(s) : null })
            ]
          },
          p
        )
      ),
      /* @__PURE__ */ u(
        "div",
        {
          className: M(Ke.line, a),
          style: {
            left: f.left,
            width: f.width
          }
        }
      )
    ] }) });
  }
), bm = "_root_1q8sg_1", _m = "_header_1q8sg_11", ym = "_headerText_1q8sg_21", Cm = "_eyebrow_1q8sg_27", xm = "_title_1q8sg_35", Em = "_timeline_1q8sg_42", km = "_level_1q8sg_47", Sm = "_rail_1q8sg_58", Nm = "_railLine_1q8sg_65", Rm = "_railLine_completed_1q8sg_74", Lm = "_railLine_toCurrent_1q8sg_78", Am = "_marker_1q8sg_82", Pm = "_marker_completed_1q8sg_101", Mm = "_marker_current_1q8sg_107", Om = "_body_1q8sg_120", Im = "_levelHeader_1q8sg_125", Tm = "_levelName_1q8sg_132", Dm = "_levelName_current_1q8sg_141", $m = "_levelName_completed_1q8sg_147", Fm = "_iconButton_1q8sg_152", Bm = "_iconButton_danger_1q8sg_176", zm = "_stages_1q8sg_182", jm = "_stage_1q8sg_182", Hm = "_stage_current_1q8sg_199", Vm = "_stageHeader_1q8sg_204", Wm = "_stageName_1q8sg_212", qm = "_stageActions_1q8sg_220", Gm = "_approvers_1q8sg_227", Um = "_approver_1q8sg_227", Zm = "_approverMain_1q8sg_242", Ym = "_approverName_1q8sg_249", Xm = "_approverName_pending_1q8sg_255", Km = "_approverName_rejected_1q8sg_259", Qm = "_approverName_approved_1q8sg_264", Jm = "_approverDate_1q8sg_268", e0 = "_rejectReason_1q8sg_273", t0 = "_empty_1q8sg_283", n0 = "_addStage_1q8sg_300", r0 = "_addLevel_1q8sg_323", o0 = "_dialogContent_1q8sg_327", s0 = "_dialogInput_1q8sg_333", i0 = "_dialogActions_1q8sg_348", a0 = "_approverPickerWrap_1q8sg_354", c0 = "_approverPickerInput_1q8sg_361", O = {
  root: bm,
  header: _m,
  headerText: ym,
  eyebrow: Cm,
  title: xm,
  timeline: Em,
  level: km,
  rail: Sm,
  railLine: Nm,
  railLine_completed: Rm,
  railLine_toCurrent: Lm,
  marker: Am,
  marker_completed: Pm,
  marker_current: Mm,
  body: Om,
  levelHeader: Im,
  levelName: Tm,
  levelName_current: Dm,
  levelName_completed: $m,
  iconButton: Fm,
  iconButton_danger: Bm,
  stages: zm,
  stage: jm,
  stage_current: Hm,
  stageHeader: Vm,
  stageName: Wm,
  stageActions: qm,
  approvers: Gm,
  approver: Um,
  approverMain: Zm,
  approverName: Ym,
  approverName_pending: Xm,
  approverName_rejected: Km,
  approverName_approved: Qm,
  approverDate: Jm,
  rejectReason: e0,
  empty: t0,
  addStage: n0,
  addLevel: r0,
  dialogContent: o0,
  dialogInput: s0,
  dialogActions: i0,
  approverPickerWrap: a0,
  approverPickerInput: c0
}, Ut = ({ className: e }) => /* @__PURE__ */ u("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", className: e, "aria-hidden": "true", children: /* @__PURE__ */ u("path", { d: "M12 5v14M5 12h14" }) });
function mo({
  open: e,
  title: t,
  placeholder: n,
  onSubmit: r,
  onClose: o
}) {
  const [s, a] = B("");
  on.useEffect(() => {
    e || a("");
  }, [e]);
  const c = () => {
    const l = s.trim();
    l && (r(l), o());
  };
  return /* @__PURE__ */ u(Cr, { open: e, onOpenChange: (l) => !l && o(), children: /* @__PURE__ */ N(yn, { className: "sm:rounded-2xl", children: [
    /* @__PURE__ */ u(Cn, { children: /* @__PURE__ */ u(xn, { children: t }) }),
    /* @__PURE__ */ N("div", { className: O.dialogContent, children: [
      /* @__PURE__ */ u(
        "input",
        {
          autoFocus: !0,
          className: O.dialogInput,
          placeholder: n,
          value: s,
          onChange: (l) => a(l.target.value),
          onKeyDown: (l) => {
            l.key === "Enter" && c(), l.key === "Escape" && o();
          }
        }
      ),
      /* @__PURE__ */ N("div", { className: O.dialogActions, children: [
        /* @__PURE__ */ u(he, { variant: "secondary", onClick: o, children: "Отмена" }),
        /* @__PURE__ */ u(he, { variant: "primary", onClick: c, disabled: !s.trim(), children: "Добавить" })
      ] })
    ] })
  ] }) });
}
const ph = ({
  levels: e,
  editable: t = !1,
  title: n = "Маршрут согласования",
  eyebrow: r = "Workflow",
  className: o,
  loadApprovers: s,
  onAddLevel: a,
  onRemoveLevel: c,
  onAddStage: l,
  onRemoveStage: d,
  onAddApprover: f,
  onRemoveApprover: m
}) => {
  const [h, p] = B(!1), [w, g] = B(null);
  return /* @__PURE__ */ N("div", { className: M(O.root, o), children: [
    /* @__PURE__ */ u("div", { className: O.header, children: /* @__PURE__ */ N("div", { className: O.headerText, children: [
      /* @__PURE__ */ u("span", { className: O.eyebrow, children: r }),
      /* @__PURE__ */ u("span", { className: O.title, children: n })
    ] }) }),
    /* @__PURE__ */ N("div", { className: O.timeline, children: [
      e.map((v, b) => {
        const y = e[b + 1], _ = M(O.railLine, {
          [O.railLine_completed]: v.status === "completed" && y?.status === "completed",
          [O.railLine_toCurrent]: v.status === "completed" && y?.status === "current"
        });
        return /* @__PURE__ */ N("div", { className: O.level, children: [
          /* @__PURE__ */ N("div", { className: O.rail, children: [
            b < e.length - 1 && /* @__PURE__ */ u("span", { className: _ }),
            /* @__PURE__ */ u(
              "span",
              {
                className: M(O.marker, {
                  [O.marker_completed]: v.status === "completed",
                  [O.marker_current]: v.status === "current"
                }),
                children: v.status === "completed" && /* @__PURE__ */ u(vo, {})
              }
            )
          ] }),
          /* @__PURE__ */ N("div", { className: O.body, children: [
            /* @__PURE__ */ N("div", { className: O.levelHeader, children: [
              /* @__PURE__ */ u(
                "span",
                {
                  className: M(O.levelName, {
                    [O.levelName_current]: v.status === "current",
                    [O.levelName_completed]: v.status === "completed"
                  }),
                  children: v.name
                }
              ),
              t && /* @__PURE__ */ N(Je, { children: [
                /* @__PURE__ */ u(
                  "button",
                  {
                    type: "button",
                    className: O.iconButton,
                    onClick: () => g(v.id),
                    "aria-label": "Добавить этап",
                    title: "Добавить этап",
                    children: /* @__PURE__ */ u(Ut, {})
                  }
                ),
                /* @__PURE__ */ u(
                  "button",
                  {
                    type: "button",
                    className: M(O.iconButton, O.iconButton_danger),
                    onClick: () => c?.(v.id),
                    "aria-label": "Удалить уровень",
                    title: "Удалить уровень",
                    children: /* @__PURE__ */ u(dt, {})
                  }
                )
              ] })
            ] }),
            v.stages.length > 0 && /* @__PURE__ */ u("div", { className: O.stages, children: v.stages.map((C) => /* @__PURE__ */ N(
              "div",
              {
                className: M(O.stage, {
                  [O.stage_current]: v.status === "current"
                }),
                children: [
                  /* @__PURE__ */ N("div", { className: O.stageHeader, children: [
                    /* @__PURE__ */ u("span", { className: O.stageName, children: C.name }),
                    /* @__PURE__ */ u("div", { className: O.stageActions, children: t && /* @__PURE__ */ N(Je, { children: [
                      s ? /* @__PURE__ */ u(
                        _p,
                        {
                          value: null,
                          placeholder: "",
                          title: "Добавить согласующего",
                          searchPlaceholder: "Поиск сотрудника",
                          loadOptions: s,
                          onChange: (E) => f?.(v.id, C.id, E),
                          className: O.approverPickerWrap,
                          inputClassName: O.approverPickerInput,
                          selectedOptionRender: () => /* @__PURE__ */ u(Ut, {})
                        }
                      ) : null,
                      /* @__PURE__ */ u(
                        "button",
                        {
                          type: "button",
                          className: M(O.iconButton, O.iconButton_danger),
                          onClick: () => d?.(v.id, C.id),
                          "aria-label": "Удалить этап",
                          title: "Удалить этап",
                          children: /* @__PURE__ */ u(dt, {})
                        }
                      )
                    ] }) })
                  ] }),
                  C.approvers.length === 0 ? /* @__PURE__ */ N("span", { className: O.empty, children: [
                    /* @__PURE__ */ u(Si, {}),
                    "Согласующий не назначен"
                  ] }) : /* @__PURE__ */ u("div", { className: O.approvers, children: C.approvers.map((E) => {
                    const x = E.status ?? "pending";
                    return /* @__PURE__ */ N("div", { className: O.approver, children: [
                      /* @__PURE__ */ N("div", { className: O.approverMain, children: [
                        /* @__PURE__ */ u(
                          "span",
                          {
                            className: M(O.approverName, {
                              [O.approverName_pending]: x === "pending",
                              [O.approverName_approved]: x === "approved",
                              [O.approverName_rejected]: x === "rejected"
                            }),
                            children: E.fullName
                          }
                        ),
                        E.actedAt && x !== "pending" && /* @__PURE__ */ u("span", { className: O.approverDate, children: E.actedAt }),
                        x === "rejected" && E.rejectReason && /* @__PURE__ */ N("span", { className: O.rejectReason, children: [
                          "Причина: ",
                          E.rejectReason
                        ] })
                      ] }),
                      t && /* @__PURE__ */ u(
                        "button",
                        {
                          type: "button",
                          className: M(O.iconButton, O.iconButton_danger),
                          onClick: () => m?.(v.id, C.id, E.id),
                          "aria-label": "Удалить согласующего",
                          title: "Удалить согласующего",
                          children: /* @__PURE__ */ u(dt, {})
                        }
                      )
                    ] }, E.id);
                  }) })
                ]
              },
              C.id
            )) }),
            t && /* @__PURE__ */ N(
              "button",
              {
                type: "button",
                className: O.addStage,
                onClick: () => g(v.id),
                children: [
                  /* @__PURE__ */ u(Ut, {}),
                  " Добавить этап"
                ]
              }
            )
          ] })
        ] }, v.id);
      }),
      t && /* @__PURE__ */ N("div", { className: O.level, children: [
        /* @__PURE__ */ u("div", { className: O.rail, children: /* @__PURE__ */ u("span", { className: M(O.marker), "aria-hidden": !0 }) }),
        /* @__PURE__ */ u("div", { className: O.body, children: /* @__PURE__ */ N(
          "button",
          {
            type: "button",
            className: M(O.addStage, O.addLevel),
            onClick: () => p(!0),
            children: [
              /* @__PURE__ */ u(Ut, {}),
              " Добавить уровень"
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ u(
      mo,
      {
        open: h,
        title: "Новый уровень",
        placeholder: "Название уровня",
        onClose: () => p(!1),
        onSubmit: (v) => a?.(v)
      }
    ),
    /* @__PURE__ */ u(
      mo,
      {
        open: w !== null,
        title: "Новый этап",
        placeholder: "Название этапа",
        onClose: () => g(null),
        onSubmit: (v) => w && l?.(w, v)
      }
    )
  ] });
};
export {
  ph as ApprovalRoute,
  $0 as ArrowDownBlueIcon,
  Qn as ArrowDownIcon,
  D0 as ArrowRightIcon,
  eh as BaseBlock,
  he as Button,
  q0 as CameraIcon,
  j0 as CancelIcon,
  rh as Card,
  oh as Carousel,
  L0 as ChartIcon,
  T0 as ChatIcon,
  B0 as CheckGreen,
  Y0 as ClockFilledIcon,
  p0 as ClockIcon,
  F0 as CloseRed,
  ih as CollapsableBlock,
  c1 as Collapse,
  Ai as Colors,
  Ni as CopyIcon,
  yc as CopyTextTrigger,
  dt as CrossIcon,
  _p as DialogSelect,
  vo as DoneIcon,
  J0 as DownloadIcon,
  U0 as EditIcon,
  bn as EmptyComponent,
  Li as EmptyIcon,
  H0 as EnvelopIcon,
  A0 as FeedbackIcon,
  m0 as FileReloadIcon,
  I0 as FileSync,
  G0 as FilterIcon,
  h0 as FolderEditIcon,
  g0 as GraduateIcon,
  v0 as GridIcon,
  w0 as HeartIcon,
  b0 as HelpIcon,
  z0 as HistoryBlue,
  f0 as HomeIcon,
  Ri as InfoIcon,
  vr as InputCaption,
  Q0 as IslandIcon,
  wr as Label,
  _0 as ListIcon,
  y0 as MarketIcon,
  M0 as MegaphoneIcon,
  V0 as MessageIcon,
  R0 as NotebookIcon,
  W0 as PhoneIcon,
  C0 as PlaneIcon,
  sh as Popover,
  x0 as ProfileIcon,
  E0 as ProfileSearchIcon,
  nh as RadioGroupButton,
  Z0 as ReloadIcon,
  K0 as SchoolIcon,
  Kn as SearchIcon,
  ah as Select,
  X0 as SettingsIcon,
  wt as Spinner,
  uh as Stepper,
  fh as Tabs,
  dh as TabsRounded,
  W1 as Tag,
  P0 as TaskListIcon,
  N0 as TimesheetIcon,
  $o as TooltipDark,
  Id as TooltipLight,
  lh as TreeDialogSelect,
  k0 as TrendUpIcon,
  O0 as UserSwitchIcon,
  S0 as WalletIcon,
  Si as WarnIcon,
  th as useDropdownPosition,
  Ha as useMeasureElement
};
//# sourceMappingURL=ui-library.es.js.map
