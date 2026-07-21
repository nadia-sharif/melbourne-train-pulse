import{t as e}from"./mat4f64-E_FXCKxO.js";import{D as t,_ as n}from"./mat4-i5hbKyBt.js";import{n as r}from"./glsl-D85RBwKC.js";import{t as i}from"./FloatBindUniform-C4h6J6-v.js";import{t as a}from"./Float4BindUniform-CcjALdTT.js";import{t as o}from"./ShaderBuilder-8uuwgR05.js";import{t as s}from"./Matrix4PassUniform-Bb5ATfS6.js";function c(){let e=new o;return e.attributes.add(`position`,`vec3`),e.attributes.add(`color`,`vec4`),e.attributes.add(`size`,`float`),e.varyings.add(`vcolor`,`vec4`),e.varyings.add(`vsize`,`float`),e.vertex.uniforms.add(new s(`transform`,(e,t)=>l(e,t)),new a(`viewport`,e=>e.camera.fullViewport),new i(`pixelRatio`,e=>e.camera.pixelRatio)),e.vertex.main.add(r`gl_Position = transform * vec4(position, 0);
vcolor = color / 1.2;
vsize = size * 5.0 * pixelRatio;
gl_PointSize = vsize;`),e.fragment.main.add(r`float cap = 0.7;
float scale = 1.0 / cap;
float helper = clamp(length(abs(gl_PointCoord - vec2(0.5))), 0.0, cap);
float alpha = clamp((cap - helper) * scale, 0.0, 1.0);
float intensity = alpha * alpha * alpha;
if (vsize < 3.0) {
intensity *= 0.5;
}
fragColor = vec4(vcolor.xyz, intensity);`),e}function l(e,r){let i=24e-8;return t(u,r.camera.projectionMatrix),u[10]=i-1,u[11]=-1,u[14]=(i-2)*r.camera.near,n(u,u,r.camera.viewMatrix),n(u,u,e.modelMatrix)}var u=e(),d=Object.freeze(Object.defineProperty({__proto__:null,build:c},Symbol.toStringTag,{value:`Module`}));export{c as n,d as t};