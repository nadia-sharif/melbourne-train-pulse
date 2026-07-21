import{t as e}from"./NoParameters-XZJ-8n06.js";import{n as t}from"./glsl-D85RBwKC.js";import{t as n}from"./Texture2DPassUniform-CiCHIiok.js";import{t as r}from"./ScreenSpacePass.glsl-9L-_X5OK.js";import{t as i}from"./ShaderBuilder-8uuwgR05.js";import{t as a}from"./RgbNormalizedDepthEncoding.glsl-CdjZNNFH.js";var o=class extends e{};function s(){let e=new i;e.include(r);let o=e.fragment;return o.uniforms.add(new n(`splatOutputDepth`,e=>e.splatDepth)),o.include(a),o.main.add(t`vec4 splatDepth = texture(splatOutputDepth, uv);
float depth = decodeRGBToNormalizedDepth(splatDepth.xyz);
if(splatDepth.a < 1.0) {
discard;
}
gl_FragDepth = depth;`),e}var c=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatDepthCompositionPassParameters:o,build:s},Symbol.toStringTag,{value:`Module`}));export{s as n,c as r,o as t};