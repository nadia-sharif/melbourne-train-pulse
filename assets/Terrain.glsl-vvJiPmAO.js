import{c as e}from"./vec3f64-DIOQknMY.js";import{P as t,y as n}from"./vec3-C5q_s_3T.js";import{t as r}from"./mat4f64-E_FXCKxO.js";import{C as i}from"./mat4-i5hbKyBt.js";import{t as a}from"./Uniform-FnPH-ujw.js";import{n as o,t as s}from"./glsl-D85RBwKC.js";import{t as c}from"./Float3BindUniform-BmdF9XGj.js";import{t as l}from"./Matrix4DrawUniform-CQqS-mc3.js";import{n as u,r as d,t as f}from"./View.glsl-u7L8AmT0.js";import{i as p}from"./Slice.glsl-CjvAkseN.js";import{t as m}from"./OutputHighlight.glsl-CfLvc4dK.js";import{t as h}from"./Texture2DBindUniform-4_yYNByJ.js";import{t as g}from"./ShaderBuilder-8uuwgR05.js";import{t as _}from"./alphaCutoff.glsl-WbW_sSK3.js";import{i as v}from"./Emissions.glsl-CHEom5a0.js";import{t as y}from"./OutputColorHighlightOLID.glsl-CzPahQyj.js";import{t as b}from"./NormalAttribute.glsl-C7jpaUvF.js";import{t as x}from"./ForwardLinearDepth.glsl-DgvdPZSv.js";import{n as S}from"./ForwardLinearDepthToWriteShadowMap.glsl-BdBeU_ay.js";import{t as C}from"./Transform.glsl-CM6cQEqg.js";import{t as w}from"./OutputDepth.glsl-C_Yal9Dw.js";import{a as T,n as E,r as D,t as O}from"./EvaluateSceneLighting.glsl-lk8xFtKS.js";import{n as k,r as A}from"./MainLighting.glsl-BzpgU6pB.js";import{i as j,n as M}from"./ReadShadowMap.glsl-oFMVskK0.js";import{t as N}from"./BackgroundGrid.glsl-pCVrjbsy.js";import{n as P,t as F}from"./OutputHighlightOverlay--EX3tcXg.js";import{t as I}from"./NormalUtils.glsl-BTc1OVOC.js";function L(e,t){e.varyings.add(`tbnTangent`,`vec3`),e.varyings.add(`tbnBiTangent`,`vec3`),t.spherical?e.vertex.code.add(o`void forwardVertexTangent(vec3 n) {
tbnTangent = normalize(cross(vec3(0.0, 0.0, 1.0), n));
tbnBiTangent = normalize(cross(n, tbnTangent));
}`):e.vertex.code.add(o`void forwardVertexTangent(vec3 n) {
tbnTangent = vec3(1.0, 0.0, 0.0);
tbnBiTangent = normalize(cross(n, tbnTangent));
}`),e.fragment.code.add(o`mat3 getTBNMatrix(vec3 n) {
return mat3(tbnTangent, tbnBiTangent, n);
}`)}var R=class extends j{constructor(){super(...arguments),this.overlayOpacity=1}};function z(e,t){let{vertex:n,fragment:r,varyings:i}=e;i.add(`vtc`,`vec2`),n.uniforms.add(new H(`texOffsetAndScale`)),r.uniforms.add(new U(`tex`)),r.uniforms.add(new V(`textureOpacities`));let{textureFadingEnabled:a,renderOccluded:c,tileBlendInput:l}=t,u=a&&!c;u&&(n.uniforms.add(new H(`nextTexOffsetAndScale`)),i.add(`nvtc`,`vec2`),r.uniforms.add(new U(`texNext`)),r.uniforms.add(new V(`nextTexOpacities`)),r.uniforms.add(new B(`fadeFactor`)));let d=l===2;d&&r.include(N);let f=l===1;f&&r.uniforms.add(new V(`backgroundColor`)),n.code.add(o`
  void forwardTextureCoordinatesWithTransform(in vec2 uv) {
    vtc = texOffsetAndScale.xy + uv * texOffsetAndScale.zw;
    ${s(u,`nvtc = nextTexOffsetAndScale.xy + uv * nextTexOffsetAndScale.zw;`)}
  }`),r.code.add(o`
    vec4 getColor(vec4 color, vec2 uv, vec3 opacities) {
      ${s(d||f,o`
          if (opacities.y <= 0.0) {
            return color * opacities.z * opacities.x;
          }
          vec4 bg = vec4(${f?o`backgroundColor`:o`gridColor(uv)`} * opacities.y, opacities.y);
          vec4 layer = color * opacities.z;
          return (bg * (1.0 - layer.a) + layer) * opacities.x;
        `,`return color;`)}
    }`),u?r.code.add(o`vec4 getTileColor() {
vec4 color = getColor(texture(tex, vtc), vtc, textureOpacities);
if (fadeFactor >= 1.0) {
return color;
}
vec4 nextColor = getColor(texture(texNext, nvtc), nvtc, nextTexOpacities);
return mix(nextColor, color, fadeFactor);
}`):r.code.add(o`vec4 getTileColor() {
return getColor(texture(tex, vtc), vtc, textureOpacities);
}`)}var B=class extends a{constructor(e){super(e,`float`)}},V=class extends a{constructor(e){super(e,`vec3`)}},H=class extends a{constructor(e){super(e,`vec4`)}},U=class extends a{constructor(e){super(e,`sampler2D`)}},W=class extends R{constructor(){super(...arguments),this.useStencil=!1}};function G(e){let r=new g,{attributes:a,vertex:j,fragment:N,varyings:R}=r;a.add(`position`,`vec3`),r.include(b,e),r.include(v,e);let B=()=>{r.include(I,e),j.code.add(o`vec3 getNormal() {
float z = 1.0 - abs(normalCompressed.x) - abs(normalCompressed.y);
vec3 n = vec3(normalCompressed + vec2(normalCompressed.x >= 0.0 ? 1.0 : -1.0,
normalCompressed.y >= 0.0 ? 1.0 : -1.0) * min(z, 0.0), z);
return normalize(n);
}`)};u(j,e),r.include(C),N.include(_);let{output:V,overlayMode:H,tileBorders:U,transparencyMode:W,overlayEnabled:G}=e,J=W===2||W===3,Y=e.pbrMode!==0,X=G&&J;switch(V){case 0:case 1:case 2:{r.include(z,e),N.include(D,e),G&&r.include(P,e);let a=H===2;a&&r.include(L,e),R.add(`vnormal`,`vec3`),R.add(`vpos`,`vec3`,{invariant:!0}),R.add(`vup`,`vec3`),B(),j.main.add(o`
          vpos = position;
          vec3 positionWorld = position + localOrigin;
          gl_Position = transformPosition(proj, view, vpos);
          vnormal = getNormal();
          vup = getLocalUp(position, localOrigin);
          ${s(a,o`forwardVertexTangent(vnormal);`)}

          forwardTextureCoordinatesWithTransform(uv0);
          ${s(G,`setOverlayVTC(uv0);`)}
          ${s(U,`forwardTextureCoordinates();`)}
          forwardLinearDepthToReadShadowMap();`),r.include(M,e),N.include(p,e),N.include(D,e),N.include(T,e),r.include(y,e),f(N,e),E(N),O(N),N.uniforms.add(j.uniforms.get(`localOrigin`),new c(`viewDirection`,({camera:e})=>n(q,t(q,e.viewMatrix[12],e.viewMatrix[13],e.viewMatrix[14])))),a&&N.uniforms.add(new h(`ovWaterTex`,e=>e.overlay?.getTexture(3)),new l(`view`,({origin:e},{camera:t})=>i(K,t.viewMatrix,e))),A(N),k(N),N.main.add(o`
          vec3 normal = normalize(vnormal);
          float lightAlignment = dot(normal, mainLightDirection);

          float additionalAmbientScale = additionalDirectedAmbientLight(lightAlignment);
          float shadow = readShadow(additionalAmbientScale, vpos);
          float ssao = evaluateAmbientOcclusionInverse();
          vec4 tileColor = getTileColor();

          ${s(G,o`vec4 overlayColorOpaque = getOverlayColor(ovColorTex, vtcOverlay);
                 vec4 overlayColor = overlayOpacity * overlayColorOpaque;
                 ${s(J,`if (overlayColor.a < alphaCutoff) { discard; }`)}
                 vec4 groundColor = tileColor;
                 tileColor = tileColor * (1.0 - overlayColor.a) + overlayColor;`)}

          if(tileColor.a < alphaCutoff) {
            discard;
          }

          bool sliced = rejectBySlice(vpos);
          if (sliced) {
            tileColor *= groundSliceOpacity;
          }

          vec3 albedo = tileColor.rgb;

          // heuristic shading function used in the old terrain, now used to add ambient lighting
          vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

          ${Y?o`vec4 finalColor = vec4(evaluatePBRSimplifiedLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight, normalize(vpos - cameraPosition), vup), tileColor.a);`:o`vec4 finalColor = vec4(evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight), tileColor.a);`}
          ${s(a,o`vec4 overlayWaterMask = getOverlayColor(ovWaterTex, vtcOverlay);
                 float waterNormalLength = length(overlayWaterMask);
                 if (waterNormalLength > 0.95) {
                   mat3 tbnMatrix = mat3(tbnTangent, tbnBiTangent, vnormal);
                   vec4 waterOverlayColor = vec4(overlayColor.w > 0.0 ? overlayColorOpaque.xyz/overlayColor.w : vec3(1.0), overlayColor.w);
                   vec4 viewPosition = view * vec4(vpos, 1.0);
                   vec4 waterColorLinear = getOverlayWaterColor(overlayWaterMask, waterOverlayColor, -normalize(vpos - cameraPosition), shadow, vnormal, tbnMatrix, viewPosition.xyz,  vpos + localOrigin);
                   vec4 waterColorNonLinear = delinearizeGamma(vec4(waterColorLinear.xyz, 1.0));
                   float opacity = sliced ? groundSliceOpacity : 1.0;
                   // un-gamma the ground color to mix in linear space
                   finalColor = mix(groundColor, waterColorNonLinear, waterColorLinear.w) * opacity;
                 }`)}
          ${s(U,o`vec2 dVuv = fwidth(vuv0);
                 vec2 edgeFactors = smoothstep(vec2(0.0), 1.5 * dVuv, min(vuv0, 1.0 - vuv0));
                 float edgeFactor = 1.0 - min(edgeFactors.x, edgeFactors.y);
                 finalColor = mix(finalColor, vec4(1.0, 0.0, 0.0, 1.0), edgeFactor);`)}
          outputColorHighlightOLID(applySlice(finalColor, vpos), finalColor.rgb);`)}break;case 3:X&&r.include(P,e),j.main.add(o`
        ${s(X,`setOverlayVTC(uv0);`)}
        gl_Position = transformPosition(proj, view, position);`),N.main.add(`${s(X,`if (getCombinedOverlayColor().a < alphaCutoff) discard;`)}`);break;case 5:case 6:case 7:case 8:case 9:r.include(w,e),x(r),S(r),j.main.add(o`gl_Position = transformPositionWithDepth(proj, view, position, nearFar, linearDepth);`),N.main.add(o`outputDepth(linearDepth);`);break;case 4:X&&r.include(P,e),R.add(`vnormal`,`vec3`),d(j),B(),j.main.add(o`
        ${s(X,`setOverlayVTC(uv0);`)}
        gl_Position = transformPosition(proj, view, position);
        vnormal = normalize((viewNormal * vec4(getNormal(), 1.0)).xyz);`),N.main.add(o`
        ${s(X,`if (getCombinedOverlayColor().a < alphaCutoff) discard;`)}
        vec3 normal = normalize(vnormal);
        if (gl_FrontFacing == false) {
          normal = -normal;
        }
        fragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);`);break;case 10:G&&(r.include(P,e),r.include(F,e)),j.main.add(o`
        ${s(G,`setOverlayVTC(uv0);`)}
        gl_Position = transformPosition(proj, view, position);`),r.include(m,e),N.main.add(o`
        ${s(G,o`
           calculateOcclusionAndOutputHighlight(getAllOverlayHighlightValuesEncoded());`,`calculateOcclusionAndOutputHighlight();`)}
      `);break;case 11:if(G)r.include(P,e),j.main.add(o`gl_Position = transformPosition(proj, view, position);
setOverlayVTC(uv0);`),N.main.add(o`fragColor = getOverlayColorTexel();`);else{let e=W===0;j.main.add(o`${s(e,`gl_Position = transformPosition(proj, view, position);`)}`),N.main.add(o`fragColor = vec4(0.0);`)}}return r}var K=r(),q=e(),J=Object.freeze(Object.defineProperty({__proto__:null,TerrainPassParameters:W,build:G},Symbol.toStringTag,{value:`Module`}));export{W as n,G as r,J as t};