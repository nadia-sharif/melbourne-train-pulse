import{i as e,n as t,o as n}from"./screenUtils-7zYZMDFt.js";import{l as r}from"./vec4-B-G2J025.js";import{o as i}from"./vec4f64-CjgU5APJ.js";import{t as a}from"./NoParameters-XZJ-8n06.js";import{n as o}from"./glsl-D85RBwKC.js";import{t as s}from"./Float4PassUniform-Cu2daSgY.js";import{t as c}from"./Texture2DPassUniform-CiCHIiok.js";import{t as l}from"./ShaderBuilder-8uuwgR05.js";import{t as u}from"./BooleanPassUniform-AaK-BoNM.js";var d=class extends a{constructor(){super(...arguments),this.mask=null,this.overlay=null,this.input=null,this.size=0}};function f(){let e=new l;return e.attributes.add(`position`,`vec2`),e.vertex.uniforms.add(new s(`drawPosition`,(e,t)=>p(e,t))),e.varyings.add(`vUV`,`vec2`),e.vertex.main.add(o`vUV = position;
gl_Position = vec4(drawPosition.xy + vec2(position - 0.5) * drawPosition.zw, 0.0, 1.0);`),e.fragment.uniforms.add(new c(`textureInput`,e=>e.input)),e.fragment.uniforms.add(new c(`textureMask`,e=>e.mask)),e.fragment.uniforms.add(new c(`textureOverlay`,e=>e.overlay)),e.fragment.uniforms.add(new u(`maskEnabled`,e=>e.magnifier.maskEnabled)),e.fragment.uniforms.add(new u(`overlayEnabled`,e=>e.magnifier.overlayEnabled)),e.fragment.code.add(o`const float barrelFactor = 1.1;
vec2 barrel(vec2 uv) {
vec2 uvn = uv * 2.0 - 1.0;
if (uvn.x == 0.0 && uvn.y == 0.0) {
return vec2(0.5, 0.5);
}
float theta = atan(uvn.y, uvn.x);
float r = pow(length(uvn), barrelFactor);
return r * vec2(cos(theta), sin(theta)) * 0.5 + 0.5;
}`),e.fragment.main.add(o`float mask = maskEnabled ? texture(textureMask, vUV).a : 1.0;
vec4 inputColor = texture(textureInput, barrel(vUV)) * mask;
vec4 overlayColor = overlayEnabled ? texture(textureOverlay, vUV) : vec4(0);
fragColor = overlayColor + (1.0 - overlayColor.a) * inputColor;`),e}function p(t,n){let i=n.camera.pixelRatio,a=t.magnifier.offset.x*i,o=t.magnifier.offset.y*i;e(t.magnifier.position,m);let s=n.camera.screenToRender(m,h),c=Math.ceil(i*t.magnifier.size),{fullWidth:l,fullHeight:u}=n.camera;return r(g,(s[0]+a)/l*2-1,(s[1]-o)/u*2-1,c/l*2,c/u*2)}var m=n(),h=t(),g=i(),_=Object.freeze(Object.defineProperty({__proto__:null,MagnifierPassParameters:d,build:f},Symbol.toStringTag,{value:`Module`}));export{d as n,f as r,_ as t};