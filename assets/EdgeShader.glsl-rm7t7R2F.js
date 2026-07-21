import{D as e}from"./vec2-C5dJMieJ.js";import{a as t,o as n}from"./vec2f64-IO40D2xB.js";import"./NoParameters-XZJ-8n06.js";import{t as r}from"./Uniform-FnPH-ujw.js";import{t as i}from"./Float3PassUniform-YEiGS05C.js";import{n as a,t as o}from"./glsl-D85RBwKC.js";import{t as s}from"./FloatBindUniform-C4h6J6-v.js";import{t as c}from"./Matrix4BindUniform-DnHs9Hq_.js";import{t as l}from"./Float4BindUniform-CcjALdTT.js";import{t as u}from"./FloatPassUniform-DeUP8HjM.js";import{i as d}from"./Slice.glsl-CjvAkseN.js";import{t as f}from"./Float2BindUniform-C6b2PHzh.js";import{t as p}from"./Matrix3PassUniform-B98tjNzt.js";import{t as m}from"./Texture2DPassUniform-CiCHIiok.js";import{t as h}from"./ShaderBuilder-8uuwgR05.js";import{t as g}from"./NormalAttribute.glsl-C7jpaUvF.js";import{t as _}from"./DoublePrecision.glsl-7AQh4H5L.js";import{n as v,t as y}from"./Texture2DUintDrawUniform-BTyrpo6z.js";import{r as b}from"./bufferLayouts-Dsr7eygA.js";function x(e){let t=a`bool isNaN( float val )
{
return ( val < 0.0 || 0.0 < val || val == 0.0 ) ? false : true;
}`;e.code.add(t)}var S=t(.5,-4e-4);function C(e,t){let n=e.vertex;n.include(x),n.constants.add(`depthBias`,`vec2`,S),n.uniforms.add(new f(`inverseViewport`,e=>e.inverseViewport)),t.legacy?(n.uniforms.add(new c(`proj`,e=>e.camera.projectionMatrix)),n.code.add(a`vec2 calculateProjectedBiasXY(vec4 projPos, vec3 globalNormal) {
float offsetXY = depthBias.x;
vec4 projNormal = proj * localView * vec4(globalNormal, 0.0);
return offsetXY * projPos.w * 2.0 * inverseViewport * normalize(projNormal.xyz).xy;
}`)):(n.uniforms.add(new p(`transformNormalViewFromGlobal`,e=>e.transformNormalViewFromGlobal),new c(`transformProjFromView`,e=>e.camera.projectionMatrix)),n.code.add(a`vec2 calculateProjectedBiasXY(vec4 projPos, vec3 globalNormal) {
float offsetXY = depthBias.x;
vec4 projNormal = transformProjFromView * vec4(transformNormalViewFromGlobal * globalNormal, 0.0);
return offsetXY * projPos.w * 2.0 * inverseViewport * normalize(projNormal.xyz).xy;
}`)),n.code.add(a`float _calculateProjectedBiasZ(vec4 projPos) {
float offsetZ = depthBias.y;
return sqrt(max(projPos.z,0.0)) * offsetZ;
}
vec4 adjustProjectedPosition(vec4 projPos, vec3 worldNormal, float lineWidth) {
vec2 offsetXY = calculateProjectedBiasXY(projPos, worldNormal);
if (!isNaN(offsetXY.x) && !isNaN(offsetXY.y)) {
projPos.xy += offsetXY;
}
projPos.z += _calculateProjectedBiasZ(projPos);
return projPos;
}`)}function w(e,t){let n=e.vertex;t.silhouette?(n.code.add(a`bool isSilhouetteEdge(vec3 viewDir, vec3 normalA, vec3 normalB) {
float faceAVisible = dot(viewDir, normalA);
float faceBVisible = dot(viewDir, normalB);
return faceAVisible * faceBVisible < 0.0;
}`),t.legacy?n.code.add(a`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
vec3 viewNormalA = _modelToViewNormal(data.normal);
vec3 viewNormalB = _modelToViewNormal(data.normal2);
vec3 viewDir = -viewPos;
if (isSilhouetteEdge(viewDir, viewNormalA, viewNormalB)) {
return false;
}
gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
return true;
}`):n.code.add(a`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
vec3 worldNormalA = _modelToWorldNormal(data.normal);
vec3 worldNormalB = _modelToWorldNormal(data.normal2);
vec3 viewDir = -worldPos;
if (isSilhouetteEdge(viewDir, worldNormalA, worldNormalB)) {
return false;
}
gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
return true;
}`)):n.code.add(a`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
return false;
}`)}var T=new v({layout:b,itemIndexAttribute:`componentIndex`,bufferUniform:new y(`componentTextureBuffer`,e=>e.componentDataTextureBuffer?.texture)});function E(e,t){let{vertex:n}=e;e.include(g,t);let{silhouette:r,legacy:o,spherical:s}=t;e.attributes.add(`componentIndex`,`uint`);let{getTextureAttribute:l,TextureBackedBufferModule:u}=T;e.include(u),n.constants.add(`lineWidthFractionFactor`,`float`,8),n.constants.add(`extensionLengthOffset`,`float`,128),n.code.add(a`
    struct ComponentData {
      vec4 color;
      vec3 normal;
      vec3 normal2;
      float lineWidth;
      float extensionLength;
      float type;
      float verticalOffset;
    };

    ComponentData readComponentData() {
      vec3 normal = normalModel();
      vec3 normal2 = ${r?a`decompressNormal(normal2Compressed)`:a`normal`};

      vec4 colorValue = ${l(`color`)};
      float lineWidth = float(${l(`lineWidth`)}) / lineWidthFractionFactor;
      float extensionLength = float(${l(`extensionLength`)}) - extensionLengthOffset;
      // SOLID (=0/255) needs to be > 0.0, SKETCHY (=1/255) needs to be <= 0;
      float type = -(float(${l(`materialType`)})) + 0.5;
      float opacity = ${l(`opacity`)};

      float verticalOffset = ${l(`elevationOffset`)};

      return ComponentData(
        vec4(colorValue.rgb, colorValue.a * opacity),
        normal, normal2,
        lineWidth,
        extensionLength,
        type,
        verticalOffset
      );
    }
  `),o?n.code.add(a`vec3 _modelToWorldNormal(vec3 normal) {
return (model * vec4(normal, 0.0)).xyz;
}
vec3 _modelToViewNormal(vec3 normal) {
return (localView * model * vec4(normal, 0.0)).xyz;
}`):n.uniforms.add(new O(`transformNormalGlobalFromModel`)).code.add(a`vec3 _modelToWorldNormal(vec3 normal) {
return transformNormalGlobalFromModel * normal;
}`),r?(e.attributes.add(`normal2Compressed`,`vec2`),n.code.add(a`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(normalize(data.normal + data.normal2));
}`)):n.code.add(a`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(data.normal);
}`),o?n.code.add(a`void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
worldPos = (model * vec4(modelPos, 1.0)).xyz;
viewPos = (localView * vec4(worldPos, 1.0)).xyz;
}`):(n.include(_),n.uniforms.add(new k(`transformWorldFromModelTL`),new k(`transformWorldFromModelTH`),new O(`transformWorldFromModelRS`),new p(`transformViewFromCameraRelativeRS`,e=>e.transformViewFromCameraRelativeRS),new i(`transformWorldFromViewTL`,e=>e.transformWorldFromViewTL),new i(`transformWorldFromViewTH`,e=>e.transformWorldFromViewTH)).code.add(a`
      void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
        vec3 rotatedModelPosition = transformWorldFromModelRS * modelPos;
        vec3 transformCameraRelativeFromModel = dpAdd(
          transformWorldFromModelTL,
          transformWorldFromModelTH,
          -transformWorldFromViewTL,
          -transformWorldFromViewTH
        );

        worldPos = transformCameraRelativeFromModel + rotatedModelPosition;

        if (verticalOffset != 0.0) {
          vec3 vUp = ${s?`normalize(transformWorldFromModelTL + rotatedModelPosition);`:`vec3(0.0, 0.0, 1.0);`}
          worldPos += verticalOffset * vUp;
        }

        viewPos = transformViewFromCameraRelativeRS * worldPos;
      }
    `)),n.uniforms.add(new c(`transformProjFromView`,e=>e.camera.projectionMatrix)).code.add(a`vec4 projFromViewPosition(vec3 position) {
return transformProjFromView * vec4(position, 1.0);
}`),n.code.add(a`float calculateExtensionLength(float extensionLength, float lineLength) {
return extensionLength / (log2(max(1.0, 256.0 / lineLength)) * 0.2 + 1.0);
}`)}function D(e){return e===1||e===2}var O=class extends r{constructor(e){super(e,`mat3`)}},k=class extends r{constructor(e){super(e,`vec3`)}};function A(e,t){let n=t.type===2,r=t.type===0;e.attributes.add(`sideness`,`vec2`),e.vertex.code.add(a`
    struct UnpackedAttributes {
      vec2 sideness;
      vec2 sidenessNorm;
      float lineWidthPixels;
      float extensionLengthPixels;
      ${o(n,`float type;`)}
    };
  `).code.add(a`
    UnpackedAttributes unpackAttributes(ComponentData component) {
      vec2 sidenessNorm = sideness;
      vec2 sideness = sidenessNorm * 2.0 - 1.0;
      float extensionLengthPixels = component.extensionLength;
      float lineWidth = component.lineWidth;
      ${o(n,`if (component.type <= 0.0) {`)}
      ${o(!r,`extensionLengthPixels *= variantExtension * 2.0 - 1.0;`)}
      ${o(n,`}`)}
      return UnpackedAttributes(sideness, sidenessNorm, lineWidth, extensionLengthPixels ${o(n,`, component.type`)});
    }
  `)}function j(e,t){let n=e.vertex;switch(e.include(A,t),t.type){case 0:n.code.add(a`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return 0.0;
}`);break;case 1:n.uniforms.add(new u(`strokesAmplitude`,e=>e.strokesTexture.amplitude)).code.add(a`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return strokesAmplitude;
}`);break;case 2:n.uniforms.add(new u(`strokesAmplitude`,e=>e.strokesTexture.amplitude)).code.add(a`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
float type = unpackedAttributes.type;
if (type <= 0.0) {
return strokesAmplitude;
}
return 0.0;
}`);break;case 3:break;default:t.type}}function M(e,t){e.include(A,t);let{vertex:n,fragment:r}=e;switch(D(t.type)&&(e.varyings.add(`vStrokeUV`,`vec2`),n.uniforms.add(new m(`strokesTexture`,e=>e.strokesTexture.texture),new u(`strokesLog2Resolution`,e=>Math.log2(e.strokesTexture.resolution)),new u(`strokeVariants`,e=>e.strokesTexture.variants)).code.add(a`void calculateStyleOutputsSketch(float lineLength, UnpackedAttributes unpackedAttributes) {
vec2 sidenessNorm = unpackedAttributes.sidenessNorm;
float lineIndex = clamp(ceil(log2(lineLength)), 0.0, strokesLog2Resolution);
vStrokeUV = vec2(exp2(lineIndex) * sidenessNorm.y, lineIndex * strokeVariants + variantStroke + 0.5) / vec2(textureSize(strokesTexture, 0));
vStrokeUV.x += variantOffset;
}`),r.uniforms.add(new m(`strokesTexture`,e=>e.strokesTexture.texture)).code.add(a`float calculateLineOffsetSketch() {
return texture(strokesTexture, vStrokeUV).r;
}
float calculateLinePressureSketch() {
return texture(strokesTexture, vStrokeUV + vec2(0.0, 0.5)).r;
}`)),t.type){case 0:n.code.add(a`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes) {}`),r.code.add(a`float calculateLineOffset() {
return 0.0;
}
float calculateLinePressure() {
return 1.0;
}`);break;case 1:n.code.add(a`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes)
{
calculateStyleOutputsSketch(vLineLengthPixels, unpackedAttributes);
}`),r.code.add(a`float calculateLineOffset() {
return calculateLineOffsetSketch();
}
float calculateLinePressure() {
return calculateLinePressureSketch();
}`);break;case 2:e.varyings.add(`vType`,`float`),n.code.add(a`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes)
{
vType = unpackedAttributes.type;
if (unpackedAttributes.type <= 0.0) {
calculateStyleOutputsSketch(vLineLengthPixels, unpackedAttributes);
}
}`),r.code.add(a`float calculateLineOffset() {
if (vType <= 0.0) {
return calculateLineOffsetSketch();
}
else {
return 0.0;
}
}
float calculateLinePressure() {
if (vType <= 0.0) {
return calculateLinePressureSketch();
}
else {
return 1.0;
}
}`);break;case 3:break;default:t.type}}function N(t){let n=new h,{vertex:r,fragment:i,varyings:c,attributes:p}=n;t.legacy&&r.uniforms.add(new F(`model`),new F(`localView`)),n.include(C,t),n.include(E,t),n.include(j,t),n.include(A,t),n.include(M,t),i.include(d,t),n.include(w,t),c.add(`vColor`,`vec4`),c.add(`vRadius`,`float`),c.add(`vPosition`,`vec3`,{invariant:!0}),c.add(`vWorldPosition`,`vec3`,{invariant:!0}),c.add(`vLineLengthPixels`,`float`),c.add(`vSizeFalloffFactor`,`float`),r.uniforms.add(new f(`pixelToNDC`,({camera:t})=>e(P,2/t.fullViewport[2],2/t.fullViewport[3])),new l(`viewport`,e=>e.camera.fullViewport),new s(`pixelRatio`,e=>e.camera.pixelRatio)),p.add(`position0`,`vec3`),p.add(`position1`,`vec3`),p.add(`variantOffset`,`float`),p.add(`variantStroke`,`float`),p.add(`variantExtension`,`float`);let m=t.type===1,g=t.type===2;return r.uniforms.add(new u(`distanceFalloffFactor`,e=>e.distanceFalloffFactor)).code.add(a`
    float distanceBasedPerspectiveFactor(float distance) {
      return clamp(sqrt(distanceFalloffFactor / distance), 0.0, 1.0);
    }

    void calculateGeometricOutputs(vec3 viewPosV0, vec3 viewPosV1, vec3 worldPosV0, vec3 worldPosV1, vec3 worldNormal, UnpackedAttributes unpackedAttributes) {
      vec2 sideness = unpackedAttributes.sideness;
      vec2 sidenessNorm = unpackedAttributes.sidenessNorm;

      vWorldPosition = mix(worldPosV0, worldPosV1, sidenessNorm.y).xyz;

      vec3 viewPos = mix(viewPosV0, viewPosV1, sidenessNorm.y);

      vec4 projPosV0 = projFromViewPosition(viewPosV0);
      vec4 projPosV1 = projFromViewPosition(viewPosV1);
      vec4 projPos = projFromViewPosition(viewPos);

      vec3 screenSpaceLineNDC = (projPosV1.xyz / projPosV1.w - projPosV0.xyz / projPosV0.w);
      vec2 ndcToPixel = viewport.zw * 0.5;
      vec2 screenSpaceLinePixels = screenSpaceLineNDC.xy * ndcToPixel;
      float lineLengthPixels = length(screenSpaceLinePixels);

      float dzPerPixel = screenSpaceLineNDC.z / lineLengthPixels;
      vec2 screenSpaceDirection = screenSpaceLinePixels / lineLengthPixels;
      vec2 perpendicularScreenSpaceDirection = vec2(screenSpaceDirection.y, -screenSpaceDirection.x) * sideness.x;

      float falloffFactor = distanceBasedPerspectiveFactor(-viewPos.z) * pixelRatio;
      float lineWidthPixels = unpackedAttributes.lineWidthPixels * falloffFactor;

      float extensionLengthPixels = calculateExtensionLength(unpackedAttributes.extensionLengthPixels, lineLengthPixels) * falloffFactor;
      float lineAmplitudePixels = calculateLineAmplitude(unpackedAttributes) * pixelRatio;

      vSizeFalloffFactor = falloffFactor;

      float lineWidthAndAmplitudePixels = lineWidthPixels + lineAmplitudePixels + lineAmplitudePixels;
      float extendedLineLengthPixels = lineLengthPixels + extensionLengthPixels + extensionLengthPixels;

      // Line size with padding
      float halfAAPaddedLineWidthAndAmplitudePixels = lineWidthAndAmplitudePixels * 0.5 + ${a.float(1)};
      float aaPaddedRoundedCapSizePixels = lineWidthPixels * 0.5 + ${a.float(1)};

      // Half line width in NDC including padding for anti aliasing
      vec2 halfAAPaddedLineWidthAndAmplitudeNDC = halfAAPaddedLineWidthAndAmplitudePixels * pixelToNDC;
      vec2 aaPaddedRoundedCapSizeNDC = aaPaddedRoundedCapSizePixels * pixelToNDC;
      vec2 extensionLengthNDC = extensionLengthPixels * pixelToNDC;

      // Compute screen space position of vertex, offsetting for line size and end caps
      vec2 ndcOffset = (
          screenSpaceDirection * sideness.y * (aaPaddedRoundedCapSizeNDC + extensionLengthNDC)
        + perpendicularScreenSpaceDirection * halfAAPaddedLineWidthAndAmplitudeNDC
      );

      projPos.xy += ndcOffset * projPos.w;
      projPos.z += (dzPerPixel * (aaPaddedRoundedCapSizePixels + extensionLengthPixels)) * sideness.y * projPos.w;

      projPos = adjustProjectedPosition(projPos, worldNormal, 1.0 + max((lineWidthAndAmplitudePixels - 1.0) * 0.5, 0.0));

      // Line length with end caps
      float aaPaddedLineWithCapsLengthPixels = extendedLineLengthPixels + aaPaddedRoundedCapSizePixels + aaPaddedRoundedCapSizePixels;

      float pixelPositionAlongLine = aaPaddedLineWithCapsLengthPixels * sidenessNorm.y - aaPaddedRoundedCapSizePixels;

      // Position in pixels with origin at first vertex of line segment
      vPosition = vec3(
        halfAAPaddedLineWidthAndAmplitudePixels * sideness.x,
        pixelPositionAlongLine,
        pixelPositionAlongLine / extendedLineLengthPixels
      );

      // The line width radius in pixels
      vRadius = lineWidthPixels * 0.5;
      vLineLengthPixels = extendedLineLengthPixels;

      // discard short edges below a certain length threshold
      ${o(m||g,a`if (lineLengthPixels <= 3.0 ${o(g,` && unpackedAttributes.type <= 0.0`)}) {
                gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
                return;
             }`)}
      gl_Position = projPos;
    }`),r.main.add(a`
    ComponentData component = readComponentData();
    UnpackedAttributes unpackedAttributes = unpackAttributes(component);

    vec3 worldPosV0, worldPosV1, viewPosV0, viewPosV1;
    worldAndViewFromModelPosition(position0, component.verticalOffset, worldPosV0, viewPosV0);
    worldAndViewFromModelPosition(position1, component.verticalOffset, worldPosV1, viewPosV1);

    // Component color
    vColor = component.color;

    // Discard fully transparent edges
    if (vColor.a < ${a.float(.00392156862745098)}) {
      gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
      return;
    }

    if (discardNonSilhouetteEdges(viewPosV0, worldPosV0, component)) {
      return;
    }

    // General geometric computation for all types of edges
    calculateGeometricOutputs(viewPosV0, viewPosV1, worldPosV0, worldPosV1, worldNormal(component), unpackedAttributes);

    // Specific computation for different edge styles
    calculateStyleOutputs(unpackedAttributes);`),i.code.add(a`float lineWithCapsDistance(float radius, vec2 position, float lineLength) {
float positionX = position.x - calculateLineOffset();
if (radius < 1.0) {
float coverageX = clamp(min(radius, positionX + 0.5) - max(-radius, positionX - 0.5), 0.0, 1.0);
float coverageY = clamp(min(lineLength, position.y + 0.5) - max(0.0, position.y - 0.5), 0.0, 1.0);
return 0.5 - min(coverageX, coverageY);
}
else {
float positionOnCap = position.y - clamp(position.y, 0.0, lineLength);
return length(vec2(positionX, positionOnCap)) - radius;
}
}`),i.main.add(a`float radius = vRadius * calculateLinePressure();
float distance = lineWithCapsDistance(radius, vPosition.xy, vLineLengthPixels);
float coverage = clamp(0.5 - distance, 0.0, 1.0);
discardBySlice(vWorldPosition);
fragColor = vec4(vColor.rgb, vColor.a * coverage);`),n}var P=n(),F=class extends r{constructor(e){super(e,`mat4`)}},I=Object.freeze(Object.defineProperty({__proto__:null,build:N},Symbol.toStringTag,{value:`Module`}));export{N as n,I as t};