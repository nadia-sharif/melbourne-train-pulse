import{n as e}from"./glsl-D85RBwKC.js";import{n as t}from"./View.glsl-u7L8AmT0.js";import{t as n}from"./Float4PassUniform-Cu2daSgY.js";import{i as r}from"./Slice.glsl-CjvAkseN.js";import{t as i}from"./ObjectAndLayerIdColor.glsl-UC9jbvaT.js";import{t as a}from"./ShaderBuilder-8uuwgR05.js";import{t as o}from"./OutputColorHighlightOLID.glsl-CzPahQyj.js";import{t as s}from"./Transform.glsl-CM6cQEqg.js";import{t as c}from"./VertexColor.glsl-DrV8C2l2.js";function l(l){let u=new a,{vertex:d,fragment:f,varyings:p}=u;return u.fragment.include(r,l),u.include(s),u.include(c,l),u.include(i,l),u.include(o,l),t(d,l),u.attributes.add(`position`,`vec3`),p.add(`vpos`,`vec3`,{invariant:!0}),d.main.add(e`vpos = position;
forwardVertexColor();
gl_Position = transformPosition(proj, view, vpos);`),l.hasVertexColors||f.uniforms.add(new n(`constantColor`,e=>e.color)),f.main.add(e`
    discardBySlice(vpos);
    vec4 color = ${l.hasVertexColors?`vColor`:`constantColor`};
    outputColorHighlightOLID(applySlice(color, vpos), color.rgb);
  `),u}var u=Object.freeze(Object.defineProperty({__proto__:null,build:l},Symbol.toStringTag,{value:`Module`}));export{u as n,l as t};