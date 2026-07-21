import{o as e}from"./vec2f64-IO40D2xB.js";import{t}from"./NoParameters-XZJ-8n06.js";import{n}from"./glsl-D85RBwKC.js";import{t as r}from"./ShaderBuilder-8uuwgR05.js";import{t as i}from"./Texture2DDrawUniform-D7tKvlQx.js";import{t as a}from"./Float2DrawUniform-BbCPIPVz.js";import{t as o}from"./HighlightCellGridScreenSpacePass.glsl-CI6LME6Q.js";var s=class extends t{constructor(){super(...arguments),this.blurSize=e()}};function c(){let e=new r;return e.include(o),e.outputs.add(`fragHighlight`,`vec2`,0),e.fragment.uniforms.add(new a(`blurSize`,e=>e.blurSize),new i(`blurInput`,e=>e.blurInput)).main.add(n`vec2 highlightTextureSize = vec2(textureSize(blurInput,0));
vec2 center = texture(blurInput, sUV).rg;
if (vOutlinePossible == 0.0) {
fragHighlight = center;
} else {
vec2 sum = center * 0.204164;
sum += texture(blurInput, sUV + blurSize * 1.407333).rg * 0.304005;
sum += texture(blurInput, sUV - blurSize * 1.407333).rg * 0.304005;
sum += texture(blurInput, sUV + blurSize * 3.294215).rg * 0.093913;
sum += texture(blurInput, sUV - blurSize * 3.294215).rg * 0.093913;
fragHighlight = sum;
}`),e}var l=Object.freeze(Object.defineProperty({__proto__:null,HighlightBlurDrawParameters:s,build:c},Symbol.toStringTag,{value:`Module`}));export{c as n,s as r,l as t};