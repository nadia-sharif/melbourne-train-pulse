import{o as e}from"./vec4f64-CjgU5APJ.js";import{t}from"./Float3PassUniform-YEiGS05C.js";import{n,t as r}from"./glsl-D85RBwKC.js";import{t as i}from"./FloatBindUniform-C4h6J6-v.js";import{n as a,r as o,t as s}from"./View.glsl-u7L8AmT0.js";import{t as c}from"./Float4PassUniform-Cu2daSgY.js";import{t as l}from"./FloatPassUniform-DeUP8HjM.js";import{i as u}from"./Slice.glsl-CjvAkseN.js";import{t as d}from"./ColorConversion.glsl-C9xFjUmo.js";import{t as f}from"./ShaderBuilder-8uuwgR05.js";import{t as p}from"./OutputColorHighlightOLID.glsl-CzPahQyj.js";import{t as m}from"./Transform.glsl-CM6cQEqg.js";function h(e,t){if(!t.screenSizeEnabled)return;let r=e.vertex;s(r,t),r.uniforms.add(new i(`perScreenPixelRatio`,e=>e.camera.perScreenPixelRatio),new l(`screenSizeScale`,e=>e.screenSizeScale)).code.add(n`float computeRenderPixelSizeAt( vec3 pWorld ){
vec3 viewForward = - vec3(view[0][2], view[1][2], view[2][2]);
float viewDirectionDistance = abs(dot(viewForward, pWorld - cameraPosition));
return viewDirectionDistance * perScreenPixelRatio;
}
vec3 screenSizeScaling(vec3 position, vec3 anchor){
return position * screenSizeScale * computeRenderPixelSizeAt(anchor) + anchor;
}`)}function g(e){let i=new f;i.include(m),i.include(h,e),i.fragment.include(u,e),i.include(p,e);let{vertex:s,fragment:l}=i;return l.include(d),a(s,e),l.uniforms.add(new c(`uColor`,e=>e.color)),i.attributes.add(`position`,`vec3`),i.varyings.add(`vWorldPosition`,`vec3`),e.screenSizeEnabled&&i.attributes.add(`offset`,`vec3`),e.shadingEnabled&&(o(s),i.attributes.add(`normal`,`vec3`),i.varyings.add(`vViewNormal`,`vec3`),l.uniforms.add(new t(`shadingDirection`,e=>e.shadingDirection)),l.uniforms.add(new c(`shadedColor`,e=>_(e.shadingTint,e.color)))),s.main.add(n`
    vWorldPosition = ${e.screenSizeEnabled?n`screenSizeScaling(offset, position)`:n`position`};
    ${r(e.shadingEnabled,n`vec3 worldNormal = normal;
           vViewNormal = (viewNormal * vec4(worldNormal, 1)).xyz;`)}
    gl_Position = transformPosition(proj, view, vWorldPosition);
  `),l.main.add(n`
      discardBySlice(vWorldPosition);

      ${e.shadingEnabled?n`vec3 viewNormalNorm = normalize(vViewNormal);
             float shadingFactor = 1.0 - clamp(-dot(viewNormalNorm, shadingDirection), 0.0, 1.0);
             vec4 finalColor = mix(uColor, shadedColor, shadingFactor);`:n`vec4 finalColor = uColor;`}
      outputColorHighlightOLID(applySlice(finalColor, vWorldPosition), finalColor.rgb);`),i}function _(e,t){let n=1-e[3],r=e[3]+t[3]*n;return r===0?(v[3]=r,v):(v[0]=(e[0]*e[3]+t[0]*t[3]*n)/r,v[1]=(e[1]*e[3]+t[1]*t[3]*n)/r,v[2]=(e[2]*e[3]+t[2]*t[3]*n)/r,v[3]=t[3],v)}var v=e(),y=Object.freeze(Object.defineProperty({__proto__:null,build:g},Symbol.toStringTag,{value:`Module`}));export{g as n,y as t};