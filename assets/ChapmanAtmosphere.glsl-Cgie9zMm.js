import{t as e}from"./Float3PassUniform-YEiGS05C.js";import{n as t}from"./glsl-D85RBwKC.js";import{t as n}from"./Float3BindUniform-BmdF9XGj.js";import{t as r}from"./Float4PassUniform-Cu2daSgY.js";import{t as i}from"./FloatPassUniform-DeUP8HjM.js";import{t as a}from"./Texture2DBindUniform-4_yYNByJ.js";import{t as o}from"./FloatsPassUniform-DfJ8EJ1F.js";import{t as s}from"./Float2PassUniform-BYZ61_RB.js";import{t as c}from"./ShaderBuilder-8uuwgR05.js";import{t as l}from"./Gamma.glsl-BiRghhbe.js";import{r as u}from"./MainLighting.glsl-BzpgU6pB.js";import{t as d}from"./ToneMapping.glsl-BO4QToFy.js";import{t as f}from"./BooleanPassUniform-AaK-BoNM.js";import{t as p}from"./SphereIntersect.glsl-DoZEFl8k.js";import{n as m,t as h}from"./ChapmanRaymarching.glsl-QsDFqvFt.js";import{t as g}from"./ScreenSpacePassAtmosphere.glsl-BUOp4Xvv.js";function _(){let _=new c;_.include(g);let{fragment:v}=_;return u(v),v.include(l),v.include(p),v.include(d),v.include(h,!1),v.uniforms.add(new f(`reduced`,({reduced:e})=>e),new o(`heightParameters`,5,(e,t)=>m(t,e)),new s(`radii`,e=>e.radii),new n(`cameraPosition`,e=>e.camera.eye),new i(`innerFadeDistance`,e=>e.innerFadeDistance),new r(`undergroundColor`,e=>e.undergroundColor),new i(`altitudeFade`,e=>e.altitudeFade)).code.add(t`vec4 applyUndergroundAtmosphere(vec3 rayDir, vec3 lightDirection, vec4 fragColor) {
float rayPlanetDistance = heightParameters[3];
vec2 rayPlanetIntersect = sphereIntersect(cameraPosition, rayDir, rayPlanetDistance);
if (!((rayPlanetIntersect.x <= rayPlanetIntersect.y) && rayPlanetIntersect.y > 0.0)) {
return fragColor;
}
float lightAngle = dot(lightDirection, normalize(cameraPosition + rayDir * max(0.0, rayPlanetIntersect.x)));
float surfaceShade = max(0.0, (smoothstep(-1.0, 0.8, 2.0 * lightAngle)));
vec4 color = vec4(undergroundColor.rgb * surfaceShade, undergroundColor.a * (1.0 - altitudeFade));
float relDist = (rayPlanetIntersect.y - max(0.0, rayPlanetIntersect.x)) / innerFadeDistance;
if (relDist > 1.0) {
return color;
}
return mix(fragColor, color, smoothstep(0.0, 1.0, relDist * relDist));
}
float getGlow(float dist, float radius, float intensity) {
return pow(radius / max(dist, 1e-6), intensity);
}
vec3 getSun(vec3 rayDir, vec3 lightDir){
float scaleFract = (length(cameraPosition) - radii[0]) / scaleHeight;
float sunOpticalDepth = getOpticalDepth(cameraPosition, rayDir, max(scaleFract, 0.0));
vec3 sunTransmittance = exp(-(mix(betaCombined, betaRayleigh, 0.5)) * max(0.0, sunOpticalDepth));
float mu = clamp(dot(rayDir, lightDir), 0.0, 1.0);
float sunDisc = 256.0 * smoothstep(0.0, 128.0, clamp(getGlow(1.0 - mu, 3e-5, 3.0), 0.0, 128.0));
return normalize(sunTransmittance) * sunDisc;
}`),v.uniforms.add(new e(`backgroundColor`,e=>e.backgroundColor),new a(`depthTexture`,e=>e.mainDepth)).main.add(t`vec3 rayDir = normalize(worldRay);
float depthSample = reduced ? 1.0 : texture(depthTexture, uv).r;
if (depthSample != 1.0) {
fragColor = vec4(0.0);
return;
}
vec3 color = linearizeGamma(backgroundColor) +
raymarchAtmosphere(rayDir, mainLightDirection, -1.0) +
getSun(rayDir, mainLightDirection);
float alpha = smoothstep(0.0, mix(0.15, 0.01, heightParameters[2]), length(color));
color = tonemapACES(color);
fragColor = delinearizeGamma(vec4(color, alpha));
fragColor = applyUndergroundAtmosphere(rayDir, mainLightDirection, fragColor);`),_}var v=Object.freeze(Object.defineProperty({__proto__:null,build:_},Symbol.toStringTag,{value:`Module`}));export{v as n,_ as t};