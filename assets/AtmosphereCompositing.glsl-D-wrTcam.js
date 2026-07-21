import{t as e}from"./NoParameters-XZJ-8n06.js";import{n as t}from"./glsl-D85RBwKC.js";import{t as n}from"./Texture2DBindUniform-4_yYNByJ.js";import{t as r}from"./Texture2DPassUniform-CiCHIiok.js";import{t as i}from"./ScreenSpacePass.glsl-9L-_X5OK.js";import{t as a}from"./ShaderBuilder-8uuwgR05.js";var o=class extends e{};function s(){let e=new a;return e.include(i),e.fragment.uniforms.add(new r(`colorTexture`,e=>e.color),new n(`depthTexture`,e=>e.mainDepth)),e.fragment.main.add(t`float depthSample = texture(depthTexture, uv).r;
if (depthSample != 1.0 ) {
fragColor = vec4(0);
return;
}
fragColor = texture(colorTexture, uv);`),e}var c=Object.freeze(Object.defineProperty({__proto__:null,AtmosphereCompositingPassParameters:o,build:s},Symbol.toStringTag,{value:`Module`}));export{c as n,s as r,o as t};