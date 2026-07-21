import{t as e}from"./NoParameters-XZJ-8n06.js";import{n as t,t as n}from"./glsl-D85RBwKC.js";import{n as r}from"./View.glsl-u7L8AmT0.js";import{t as i}from"./FloatPassUniform-DeUP8HjM.js";import{i as a}from"./Slice.glsl-CjvAkseN.js";import{t as o}from"./ColorConversion.glsl-C9xFjUmo.js";import{t as s}from"./Texture2DPassUniform-CiCHIiok.js";import{t as c}from"./ShaderBuilder-8uuwgR05.js";import{t as l}from"./OutputColorHighlightOLID.glsl-CzPahQyj.js";import{t as u}from"./Transform.glsl-CM6cQEqg.js";var d=class extends e{};function f(e){let d=new c,{vertex:f,fragment:p,varyings:m}=d,{output:h,perspectiveInterpolation:g,emissionDimmingPass:_}=e;return r(f,e),d.include(u),d.fragment.include(a,e),d.fragment.code.add(t`void outputObjectAndLayerIdColor() {
    ${n(h===11,`fragColor = vec4(0, 0, 0, 1);`)}
    }`),d.include(l,e),d.attributes.add(`position`,`vec3`),d.attributes.add(`uv0`,`vec2`),g&&d.attributes.add(`perspectiveDivide`,`float`),f.main.add(t`
    vpos = position;
    vTexCoord = uv0;
    gl_Position = transformPosition(proj, view, vpos);
    ${n(g,`gl_Position *= perspectiveDivide;`)}`),m.add(`vpos`,`vec3`,{invariant:!0}),m.add(`vTexCoord`,`vec2`),p.include(o),p.uniforms.add(new i(`opacity`,e=>e.opacity),new s(`tex`,e=>e.texture)).main.add(t`
    discardBySlice(vpos);
    vec4 finalColor = texture(tex, vTexCoord) * opacity;
    ${n(_,`if (finalColor.a > 0.0) { finalColor.rgb /= finalColor.a; }`)}
    outputColorHighlightOLID(applySlice(finalColor, vpos), finalColor.rgb);`),d}var p=Object.freeze(Object.defineProperty({__proto__:null,ImageMaterialPassParameters:d,build:f},Symbol.toStringTag,{value:`Module`}));export{p as n,d as r,f as t};