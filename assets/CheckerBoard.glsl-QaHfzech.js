import{n as e}from"./glsl-D85RBwKC.js";import{n as t}from"./View.glsl-u7L8AmT0.js";import{t as n}from"./Float4PassUniform-Cu2daSgY.js";import{i as r}from"./Slice.glsl-CjvAkseN.js";import{t as i}from"./ColorConversion.glsl-C9xFjUmo.js";import{t as a}from"./Float2PassUniform-BYZ61_RB.js";import{t as o}from"./ShaderBuilder-8uuwgR05.js";import{t as s}from"./OutputColorHighlightOLID.glsl-CzPahQyj.js";function c(c){let l=new o,{vertex:u,fragment:d,varyings:f}=l;return l.fragment.include(r,c),l.include(s,c),t(u,c),l.attributes.add(`position`,`vec3`),l.attributes.add(`uv0`,`vec2`),f.add(`vUV`,`vec2`),f.add(`vpos`,`vec3`),u.main.add(e`vUV = uv0;
vpos = position;
gl_Position = proj * view * vec4(position, 1.0);`),d.uniforms.add(new a(`size`,e=>e.size)),d.uniforms.add(new n(`color1`,e=>e.color1)),d.uniforms.add(new n(`color2`,e=>e.color2)),d.include(i),d.main.add(e`vec2 uvScaled = vUV / (2.0 * size);
vec2 uv = fract(uvScaled - 0.25);
vec2 ab = clamp((abs(uv - 0.5) - 0.25) / fwidth(uvScaled), -0.5, 0.5);
float fade = smoothstep(0.25, 0.5, max(fwidth(uvScaled.x), fwidth(uvScaled.y)));
float t = mix(abs(ab.x + ab.y), 0.5, fade);
fragColor = mix(color2, color1, t);
outputColorHighlightOLID(applySlice(fragColor, vpos), fragColor.rgb);`),l}var l=Object.freeze(Object.defineProperty({__proto__:null,build:c},Symbol.toStringTag,{value:`Module`}));export{c as n,l as t};