import{n as e,r as t,t as n}from"./Ellipsoid-Co4rBm1M.js";import{Y as r}from"./units-BVsWUEFD.js";import{r as i}from"./tslib.es6-qUHyP9zl.js";import{T as a,l as o}from"./mathUtils-D79yUFwW.js";import{D as s}from"./vec2-C5dJMieJ.js";import{D as c}from"./vec3-C5q_s_3T.js";import{o as l}from"./vec2f64-IO40D2xB.js";import{t as u}from"./olidUtils-D_qkWUq6.js";import{f as d,u as ee}from"./ShaderOutput-BpkC-wrv.js";import{t as f}from"./Uniform-FnPH-ujw.js";import{n as p,t as m}from"./glsl-D85RBwKC.js";import{t as h}from"./Float3BindUniform-BmdF9XGj.js";import{t as g}from"./FloatBindUniform-C4h6J6-v.js";import{n as _,t as v}from"./ShaderTechniqueConfiguration-DvmPjakj.js";import{a as te}from"./Slice.glsl-CjvAkseN.js";import{t as ne}from"./OutputHighlight.glsl-CfLvc4dK.js";import{t as re}from"./Texture2DBindUniform-4_yYNByJ.js";import{t as y}from"./Float2BindUniform-C6b2PHzh.js";import{t as b}from"./ReadDepth.glsl-Ca_0z8Pl.js";import{t as x}from"./ShaderBuilder-8uuwgR05.js";import{t as S}from"./alphaCutoff.glsl-WbW_sSK3.js";import{i as ie,n as C,r as w}from"./Emissions.glsl-CHEom5a0.js";import{t as T}from"./Texture2DDrawUniform-D7tKvlQx.js";import{n as E}from"./oitResolution.glsl-DHGKUwhe.js";import{t as ae}from"./OutputColorHighlightOLID.glsl-CzPahQyj.js";import{i as D,n as O}from"./VertexPosition.glsl-C8ahyCCs.js";import{a as k,n as A}from"./DiscardOrAdjustAlpha.glsl-4leSdqyk.js";import{r as j}from"./ForwardLinearDepthToWriteShadowMap.glsl-BdBeU_ay.js";import{t as M}from"./VertexColor.glsl-DrV8C2l2.js";import{t as oe}from"./OutputDepth.glsl-C_Yal9Dw.js";import{t as se}from"./ComputeNormalTexture.glsl-DJodqOd-.js";import{r as N,t as P}from"./EvaluateSceneLighting.glsl-lk8xFtKS.js";import{n as ce,r as le}from"./MainLighting.glsl-BzpgU6pB.js";import{t as ue}from"./PiUtils.glsl-CpyVHJCx.js";import{n as de,t as F}from"./SnowCover.glsl-BNTLK0a2.js";import{t as I}from"./ReadShadowMap.glsl-oFMVskK0.js";import{t as L}from"./MixExternalColor.glsl-cTOJOQI5.js";import{a as R,i as z,t as B}from"./OutputHighlightOverlay--EX3tcXg.js";import{n as V,t as H}from"./Texture2DUintDrawUniform-BTyrpo6z.js";import{i as U,m as W}from"./DefaultLayouts-ocbfL43f.js";import{t as fe}from"./SphereIntersect.glsl-DoZEFl8k.js";function pe(e){e.vertex.code.add(p`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${p.int(1)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${p.int(3)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${p.int(4)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${p.int(1)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}function me(e,t){switch(t.componentDataType){case 1:return ve(e,t);case 0:return ye(e,t);case 2:return;default:t.componentDataType}}var G=(e,t)=>e===`emissiveSourceMode`||e===`emissiveStrength`?t.hasEmission:e!==`olidColor`||t.output===11,K=new H(`componentTextureBuffer`,e=>e.textureBackedBuffer?.texture),he=new V({layout:W,itemIndexAttribute:`componentIndex`,bufferUniform:K,fieldFilter:G}),ge=new V({layout:U,itemIndexAttribute:`componentIndex`,bufferUniform:K,fieldFilter:G});function _e(){return u()?ge:he}function ve(e,t){let{vertex:n,fragment:r}=e,{output:i,hasEmission:a}=t,o=i===11,{getTextureAttribute:s,TextureBackedBufferModule:c}=_e();e.include(c,t),e.attributes.add(`componentIndex`,`uint`),e.varyings.add(`vExternalColorMixMode`,`mediump float`),e.varyings.add(`vExternalColor`,`vec4`),o&&e.varyings.add(`vObjectAndLayerIdColor`,`vec4`),a&&(e.varyings.add(`emissiveStrength`,`float`),e.varyings.add(`emissiveSource`,`int`)),e.include(pe),n.include(E,t),n.code.add(p`
  float readElevationOffset() {
    return ${s(`elevationOffset`)};
  }

  void forwardEmissiveStrength() {
    ${m(a,p`emissiveStrength = clamp(${s(`emissiveStrength`)}, 0.0, maxEmissiveStrength);
           emissiveSource = ${s(`emissiveSourceMode`)} == 0u ? 0 : 1;`)}
  }

  void forwardObjectAndLayerIdColor() {
    ${m(o,p`vObjectAndLayerIdColor = vec4(${s(`olidColor`)})/255.0;`)}
  }

  void decodeColorAndCastShadow(uvec4 colorAndCastShadowEncoded, out vec4 color, out bool castShadow) {
    uvec4 componentColor = colorAndCastShadowEncoded;
    castShadow = bool(componentColor.b & 1u);
    componentColor.b = componentColor.b & 254u;
    color = vec4(componentColor);
  }

  vec4 forwardExternalColor(out bool castShadows) {
    vec4 componentColor;
    decodeColorAndCastShadow(${s(`colorAndCastShadows`)}, componentColor, castShadows);

    int decodedColorMixMode;
    vExternalColor = decodeSymbolColor(componentColor, decodedColorMixMode) * 0.003921568627451; // = 1/255;
    vExternalColorMixMode = float(decodedColorMixMode) + 0.5; // add 0.5 to avoid interpolation artifacts

    return vExternalColor;
  }
`),r.code.add(p`
  void readExternalColor(out vec4 externalColor, out int externalColorMixMode) {
    externalColor = vExternalColor;
    externalColorMixMode = int(vExternalColorMixMode);
  }

  void outputObjectAndLayerIdColor() {
     ${o?p`fragColor = vObjectAndLayerIdColor;`:``}
  }
`)}function ye(e,t){let{vertex:n,fragment:r}=e;e.varyings.add(`vExternalColor`,`vec4`),r.uniforms.add(new C(`emissiveStrength`,e=>e.componentParameters.emissiveStrength)),n.uniforms.add(new R(`externalColor`,e=>e.componentParameters.externalColor)).code.add(p`float readElevationOffset() {
return 0.0;
}
void forwardObjectAndLayerIdColor() {}
void forwardEmissiveStrength() {}
vec4 forwardExternalColor(out bool castShadows) {
vExternalColor = externalColor;
castShadows = true;
return externalColor;
}`);let i=t.output===11;r.uniforms.add(new D(`externalColorMixMode`,e=>e.componentParameters.externalColorMixMode)).code.add(p`
    void readExternalColor(out vec4 color, out int colorMixMode) {
      color = vExternalColor;
      colorMixMode = externalColorMixMode;
    }

    void outputObjectAndLayerIdColor() {
      ${m(i,`fragColor = vec4(0, 0, 0, 0);`)}
    }
  `)}function q(e,t){let n=e.fragment;switch(t.doubleSidedMode){case 0:n.code.add(p`vec3 _adjustDoublesided(vec3 normal) {
return normal;
}`);break;case 1:e.include(O,t),n.code.add(p`vec3 _adjustDoublesided(vec3 normal) {
return dot(normal, vPositionWorldCameraRelative) > 0.0 ? -normal : normal;
}`);break;case 2:n.code.add(p`vec3 _adjustDoublesided(vec3 normal) {
return gl_FrontFacing ? normal : -normal;
}`);break;default:t.doubleSidedMode;case 3:}switch(t.normalType){case 0:case 1:e.include(k,t),n.main.add(p`vec3 fragmentFaceNormal = _adjustDoublesided(normalize(vNormalWorld));
vec3 fragmentFaceNormalView = gl_FrontFacing ? normalize(vNormalView) : -normalize(vNormalView);`);break;case 2:e.include(O,t),n.main.add(p`vec3 fragmentFaceNormal = normalize(cross(dFdx(vPositionWorldCameraRelative), dFdy(vPositionWorldCameraRelative)));
vec3 fragmentFaceNormalView = normalize(cross(dFdx(vPosition_view), dFdy(vPosition_view)));`)}switch(t.shadeNormals){case 3:case 1:n.main.add(p`vec3 fragmentShadingNormal = fragmentFaceNormal;`);break;case 2:e.include(O,t),n.uniforms.add(new g(`worldUpShading`,e=>a(20*(e.lighting.noonFactor-.9),0,1))).main.add(p`
            vec3 fragmentShadingNormal = fragmentFaceNormal;
            if (worldUpShading > 0.0){
              vec3 worldUpNormal = ${m(t.spherical,`normalize(positionWorld())`,`vec3(0.0, 0.0, 1.0)`)};
              fragmentShadingNormal = mix(fragmentShadingNormal, worldUpNormal, worldUpShading);
            }
          `);break;case 0:t.spherical?(e.include(O,t),n.main.add(p`vec3 fragmentShadingNormal = normalize(positionWorld());`)):n.main.add(p`vec3 fragmentShadingNormal = vec3(0.0, 0.0, 1.0);`);break;default:t.shadeNormals}}function be(e,t){e.include(M,t),e.fragment.include(L);let n=e.fragment;n.uniforms.add(new R(`baseColor`,e=>e.baseColor)),n.uniforms.add(new C(`objectOpacity`,e=>e.opacity)),t.hasVertexColors?n.code.add(p`vec3 _baseColor() {
return baseColor.rgb * vColor.rgb;
}
float _baseOpacity() {
return baseColor.a * vColor.a;
}`):n.code.add(p`vec3 _baseColor() {
return baseColor.rgb;
}
float _baseOpacity() {
return baseColor.a;
}`),n.code.add(p`vec4 computeMaterialColor(vec4 textureColor, vec4 externalColor, int externalColorMixMode) {
vec3 baseColor = _baseColor();
float baseOpacity = _baseOpacity();
vec3 color = mixExternalColor(
baseColor,
textureColor.rgb,
externalColor.rgb,
externalColorMixMode
);
float opacity = objectOpacity * mixExternalOpacity(
baseOpacity,
textureColor.a,
externalColor.a,
externalColorMixMode
);
return vec4(color, opacity);
}`)}function xe(e,t){t.hasColorTexture&&(d(t.output)||t.alphaDiscardMode!==1)?(e.include(w,t),e.fragment.uniforms.add(new T(`baseColorTexture`,e=>e.texture,e=>e.textureSampler)).code.add(p`vec4 readBaseColorTexture() { return textureLookup(baseColorTexture, vuv0); }`)):e.fragment.code.add(p`vec4 readBaseColorTexture() { return vec4(1.0); }`)}var J=class extends f{constructor(e,t){super(e,`bool`,2,(n,r,i)=>n.setUniform1b(e,t(r,i)))}},Y=class extends v{constructor(){super(...arguments),this.ellipsoidMode=1}};function X(e,t){e.fragment.uniforms.add(new y(`cameraHeights`,e=>{let n=e.camera,i=c(n.eye),a=Math.sqrt(i),l=Z(t)*r,u=i-l*l,d=o(Q,we,a-l);return d=Math.min(d,.98),s(Se,d,u)}),new h(`cameraPosition`,e=>e.camera.eye)),e.fragment.include(fe),e.fragment.code.add(p`float sphereDepthInterpolate(vec3 worldRay, vec3 viewRay, float currentLinearDepth) {
vec2 rayPlanetIntersect = sphereIntersect(cameraPosition, worldRay, cameraHeights[1]);
bool hitsPlanet = (rayPlanetIntersect.x <= rayPlanetIntersect.y) && rayPlanetIntersect.x > 0.0;
if (hitsPlanet) {
float sphereDepth = rayPlanetIntersect.x;
viewRay *= viewRay.z*sphereDepth;
float linearDepth = length(viewRay);
float sphereFade = cameraHeights[0];
return (-linearDepth) * sphereFade + currentLinearDepth * (1.0 - sphereFade);
}
return currentLinearDepth;
}`)}i([_({count:4})],Y.prototype,`ellipsoidMode`,void 0);var Se=l();function Z({ellipsoidMode:r}){switch(r){case 4:case 1:return t.radius;case 2:return n.radius;case 3:return e.radius}}function Ce(e,t){let{eye:n}=e;return Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2])-Z(t)*r>Q}var Q=4e6,we=5e6;function $(e){let t=new x,{vertex:n,fragment:r}=t;t.include(O,e),t.include(k,e),t.include(M,e),t.include(ie,e),t.include(me,e),t.include(A,e),r.include(te,e),t.include(xe,e);let{output:i,pbrMode:a,hasNormalTexture:o,snowCover:s,receiveShadows:c,shadeNormals:l,spherical:u,sphericalSR:f,overlayEnabled:h,componentDataType:g,vertexDiscardMode:_,renderOccluded:v,isGroundSlice:y}=e,C=a===1||a===2;C&&(t.include(de,e),o&&t.include(se,e));let w=ee(i),T=i===11,E=w&&g===1,D=Z(e);h&&(r.include(N,e),t.include(z,e),n.include(ue),n.uniforms.add(new J(`useENUForGlobalOverlayUV`,e=>e.useENUForGlobalOverlayUV)),r.uniforms.add(new J(`useENUForGlobalOverlayUV`,e=>e.useENUForGlobalOverlayUV)),n.constants.add(`invRadius`,`float`,1/D).code.add(`vec2 projectOverlay(vec3 pos) { return pos.xy ${m(u,`/ (1.0 + invRadius * pos.z)`)}; }`));let L=h&&d(i)&&a===4;L&&(t.varyings.add(`tbnTangent`,`vec3`),t.varyings.add(`tbnBiTangent`,`vec3`),t.varyings.add(`groundNormal`,`vec3`));let R=_===0,V=_===2;if(t.include(I,e),t.include(j,e),n.include(S),n.main.add(p`
    bool castShadows;
    vec4 externalColor = forwardExternalColor(castShadows);
    ${m(E,`if(!castShadows) { gl_Position = vec4(vec3(1e38), 1.0); return; }`)}
    ${m(!R,`if (externalColor.a ${V?`>`:`<=`} opacityCutoff) {\n         gl_Position = vec4(vec3(1e38), 1.0); return;\n       }`)}
    ${m(T,`externalColor.a = 1.0;`)}

    forwardPosition(readElevationOffset());
    forwardNormal();
    forwardTextureCoordinates();
    forwardVertexColor();
    forwardLinearDepthToReadShadowMap();
    forwardLinearDepthToWriteShadowMap();
    forwardEmissiveStrength();
    forwardObjectAndLayerIdColor();
    ${m(L,u?p`
            groundNormal = normalize(positionWorld());
            tbnTangent = normalize(cross(vec3(0.0, 0.0, 1.0), groundNormal));
            tbnBiTangent = normalize(cross(groundNormal, tbnTangent));`:p`
            groundNormal = vec3(0.0, 0.0, 1.0);
            tbnTangent = vec3(1.0, 0.0, 0.0);
            tbnBiTangent = vec3(0.0, 1.0, 0.0);`)}
    ${m(h,m(u,`
        if (useENUForGlobalOverlayUV) {
          setOverlayVTC(projectOverlay(positionForDraping()));
        } else {
          vtcOverlay = vec4(0.0); // Definite assignment
        }
      `,`setOverlayVTC(projectOverlay(positionForDraping()));`))}

    if (externalColor.a < alphaCutoff) {
      // Discard this vertex
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    }
  `),d(i))return t.include(be,e),t.include(q,e),t.include(ae,e),r.include(N,e),r.include(F,e),r.include(S),r.constants.add(`pRadius`,`float`,D).code.add(p`
      float evaluateShadow() {
        return ${c?`readShadowMap(vPositionWorldCameraRelative, linearDepth)`:`0.0`};
      }
    `).main.add(p`
      ${m(!y,`discardBySlice(vPositionWorldCameraRelative);`)}

      vec4 textureColor = readBaseColorTexture();
      discardOrAdjustAlpha(textureColor);

      // When rendering the occluded overlay, we still need to read the base color texture because we need to use the
      // same discard logic. However after that to render only the draped overlay, we simply set the base texture color
      // to zero.
      ${m(v,p`textureColor = vec4(0);`)}

      ${m(h,p`
        ${m(u,p`
            vec4 overlayUVs;
            if (useENUForGlobalOverlayUV) {
              overlayUVs = vtcOverlay;
            } else {
              const float rad2deg1 = 180.0 / PI;

              vec3 wPos = positionWorld();

              float oRadius = length(wPos.xyz);
              float oLonRad = atan(wPos.y, wPos.x);
              float sinLat = wPos.z / oRadius;

              ${m(f===1,p`
                  const float halfSemiMajorAxis = 0.5 * pRadius;
                  vec2 posWM = vec2(
                    oLonRad * pRadius,
                    halfSemiMajorAxis * log((1.0 + sinLat) / (1.0 - sinLat))
                  );

                  vec2 overlayUV = posWM;
              `,p`
                float oLatRad = asin(clamp(sinLat,-1.0,1.0));
                vec2 posWgs84 = vec2(rad2deg1 * oLonRad, rad2deg1 * oLatRad);
                vec2 overlayUV = posWgs84;
              `)}
              overlayUVs = vec4(overlayUV, overlayUV) * overlayTexScale + overlayTexOffset;
            }
          `,p`vec4 overlayUVs = vtcOverlay;`)}

        vec4 overlayColor = getOverlayColor(ovColorTex, overlayUVs);

        /* Early discard to only emit when we have overlay */
        ${m(v,p`if (overlayColor.a < alphaCutoff) { discard; }`)}
        `)}

      vec4 externalColor;
      int externalColorMixMode;
      readExternalColor(externalColor, externalColorMixMode);

      vec4 materialColor = computeMaterialColor(textureColor, externalColor, externalColorMixMode);
    `),C?(ce(r),u&&P(r),r.main.add(p`
        applyPBRFactors();
        ${m(a===1,p`if (externalColorMixMode == 3) {
              mrr = vec3(0.0, 0.6, 0.2);
            }`)}
        float additionalIrradiance = 0.02 * mainLightIntensity[2];
        ${m(o,`mat3 tangentSpace = computeTangentSpace(fragmentFaceNormal, vPositionWorldCameraRelative, vuv0);`)}
        vec3 shadingNormal = ${o?`computeTextureNormal(tangentSpace, vuv0)`:`fragmentShadingNormal`};
        vec3 groundNormal = ${u?p`normalize(positionWorld())`:p`vec3(0.0, 0.0, 1.0)`};

        vec3 viewDir = normalize(vPositionWorldCameraRelative);
        float ssao = 1.0 - occlusion * evaluateAmbientOcclusionInverse();
        ${m(s,p`float snow = getSnow(fragmentFaceNormal, normalize(positionWorld()));
                 materialColor.rgb = mix(materialColor.rgb, vec3(1.1), snow);
                 ssao = mix(ssao, 0.5 * ssao, snow);
                 shadingNormal = mix(shadingNormal, fragmentFaceNormal, snow);`)}
        ${m(h,`materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;`)}

        vec3 additionalLight = evaluateAdditionalLighting(ssao, positionWorld());
        ${m(u,`float additionalAmbientScale = additionalDirectedAmbientLight(positionWorld());`)}
        ${u?p`float shadow = max(lightingGlobalFactor * (1.0 - additionalAmbientScale), evaluateShadow());`:`float shadow = evaluateShadow();`}
        vec4 shadedColor = vec4(evaluateSceneLightingPBR(shadingNormal, materialColor.rgb, shadow, ssao, additionalLight, viewDir, groundNormal, mrr, additionalIrradiance), materialColor.a);
        `)):(le(r),u&&P(r),L&&r.uniforms.add(new re(`ovNormalTex`,e=>e.overlay?.getTexture(3))),r.main.add(p`
        ${m(u,`float additionalAmbientScale = additionalDirectedAmbientLight(positionWorld());`)}
        float shadow = ${c?u?`max(lightingGlobalFactor * (1.0 - additionalAmbientScale), evaluateShadow())`:`evaluateShadow()`:u?`lightingGlobalFactor * (1.0 - additionalAmbientScale)`:`0.0`};

        ${m(c&&l!==1,p`
            float dotFL = dot(fragmentFaceNormal, mainLightDirection);
            if( dotFL <= 0.0) shadow = 1.0;
        `)}
        ${m(s,p`float snow = getSnow(fragmentFaceNormal, normalize(positionWorld()));
               materialColor.rgb = mix(materialColor.rgb, vec3(1), snow);`)}

        // At global scale we create some additional ambient light based on the main light to simulate global illumination
        float ssao = evaluateAmbientOcclusion();
        vec3 additionalLight = evaluateAdditionalLighting(ssao, positionWorld());

        ${m(h,`materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;`)}

        vec4 shadedColor = vec4(evaluateSceneLighting(fragmentShadingNormal, materialColor.rgb, shadow, ssao, additionalLight), materialColor.a);
        ${m(L,p`vec4 overlayWaterMask = getOverlayColor(ovNormalTex, overlayUVs);
                 float waterNormalLength = length(overlayWaterMask);
                 if (waterNormalLength > 0.95) {
                   mat3 tbnMatrix = mat3(tbnTangent, tbnBiTangent, groundNormal);
                   vec4 waterColorLinear = getOverlayWaterColor(overlayWaterMask, overlayColor, -normalize(vPositionWorldCameraRelative), shadow, groundNormal, tbnMatrix, vPosition_view, positionWorld());
                   vec4 waterColorNonLinear = delinearizeGamma(vec4(waterColorLinear.xyz, 1.0));
                   // un-gamma the ground color to mix in linear space
                   shadedColor = mix(shadedColor, waterColorNonLinear, waterColorLinear.w);
                 }`)}
      `)),r.main.add(`\n      ${m(y,`if(rejectBySlice(vPositionWorldCameraRelative)) shadedColor.a *= groundSliceOpacity;`)}\n\n      outputColorHighlightOLID(applySlice(shadedColor, vPositionWorldCameraRelative), materialColor.rgb ${m(s,`, snow`)});\n    `),e.sphereDepthInterpolate&&(t.include(X,e),t.fragment.include(b),r.main.add(p`vec3 worldRay = normalize(vPositionWorldCameraRelative);
vec3 viewRay = normalize(vPosition_view);
gl_FragDepth = delinearizeDepth(sphereDepthInterpolate(worldRay, viewRay, linearizeDepth(gl_FragCoord.z)));`)),t;let H=i===4,U=i===10,W=w||i===8||i===9;return W&&t.include(oe,e),H&&t.include(q,e),h&&t.include(B,e),t.include(ne,e),r.main.add(p`
    ${m(!y,`discardBySlice(vPositionWorldCameraRelative);`)}

    vec4 textureColor = readBaseColorTexture();
    discardOrAdjustAlpha(textureColor);

    ${m(W,`outputDepth(linearDepth);`)}
    ${m(H,p`fragColor = vec4(vec3(0.5) + 0.5 * fragmentFaceNormalView, 1.0);`)}
    ${m(T,h?`fragColor = getOverlayColorTexel();`:`outputObjectAndLayerIdColor();`)}
    ${m(U,m(h,p`calculateOcclusionAndOutputHighlight(getAllOverlayHighlightValuesEncoded());`,p`calculateOcclusionAndOutputHighlight();`))}`),t}var Te=Object.freeze(Object.defineProperty({__proto__:null,build:$},Symbol.toStringTag,{value:`Module`}));export{Ce as i,$ as n,Y as r,Te as t};