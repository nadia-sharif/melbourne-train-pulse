import{o as e}from"./vec4f64-CjgU5APJ.js";import{t}from"./NoParameters-XZJ-8n06.js";import{n}from"./glsl-D85RBwKC.js";import{t as r}from"./Float4PassUniform-Cu2daSgY.js";import{t as i}from"./FloatPassUniform-DeUP8HjM.js";import{t as a}from"./Texture2DPassUniform-CiCHIiok.js";import{t as o}from"./ScreenSpacePass.glsl-9L-_X5OK.js";import{t as s}from"./ShaderBuilder-8uuwgR05.js";var c=class extends t{constructor(){super(...arguments),this.borderColor=e()}};function l(){let e=new s;return e.include(o),e.outputs.add(`fragColor`,`vec4`,0),e.fragment.uniforms.add(new a(`colorTexture`,e=>e.color),new a(`cutVolume`,e=>e.cutVolume),new a(`fillVolume`,e=>e.fillVolume),new a(`cutFillMask`,e=>e.cutFillMask),new a(`depthTexture`,e=>e.sceneDepth),new a(`cutFillReferenceDepthTexture`,e=>e.referenceDepth),new i(`pixelRatio`,(e,t)=>t.camera.pixelRatio),new r(`borderColor`,e=>e.borderColor)).main.add(n`vec4 color = texture(colorTexture, uv, 0.0);
vec4 cutVolume = texture(cutVolume, uv, 0.0);
vec4 fillVolume = texture(fillVolume, uv, 0.0);
float sceneDepth = texture(depthTexture, uv, 0.0).r;
float referenceDepth = texture(cutFillReferenceDepthTexture, uv, 0.0).r;
ivec2 iuv = ivec2(uv * vec2(textureSize(cutFillMask, 0)));
vec2 m0 = texelFetch(cutFillMask, iuv, 0).rg;
vec2 m1 = texelFetch(cutFillMask, iuv + ivec2(-1, 0), 0).rg;
vec2 m2 = texelFetch(cutFillMask, iuv + ivec2(1, 0), 0).rg;
vec2 m3 = texelFetch(cutFillMask, iuv + ivec2(0, -1), 0).rg;
vec2 m4 = texelFetch(cutFillMask, iuv + ivec2(0, 1), 0).rg;
float d = (
step(1.5, abs(m0.r - m1.r) + abs(m0.g - m1.g))
+ step(1.5, abs(m0.r - m2.r) + abs(m0.g - m2.g))
+ step(1.5, abs(m0.r - m3.r) + abs(m0.g - m3.g))
+ step(1.5, abs(m0.r - m4.r) + abs(m0.g - m4.g))
) * 0.25 * pixelRatio;
float visibleAgainstScene = step(referenceDepth, sceneDepth);
vec4 base = mix(color, cutVolume, m0.r * cutVolume.a * visibleAgainstScene);
base = mix(base, fillVolume, m0.g * fillVolume.a);
float borderFade = mix(0.5, 1.0, visibleAgainstScene);
fragColor = mix(base, borderColor, d * borderFade);`),e}var u=Object.freeze(Object.defineProperty({__proto__:null,CutFillCompositionPassParameters:c,build:l},Symbol.toStringTag,{value:`Module`}));export{u as n,l as r,c as t};