import{c as e}from"./vec3f64-DIOQknMY.js";import{D as t}from"./vec2-C5dJMieJ.js";import{o as n}from"./vec2f64-IO40D2xB.js";import{t as r}from"./Float3PassUniform-YEiGS05C.js";import{n as i,t as a}from"./glsl-D85RBwKC.js";import{t as o}from"./Matrix4BindUniform-DnHs9Hq_.js";import{t as s}from"./FloatPassUniform-DeUP8HjM.js";import{o as c}from"./Slice.glsl-CjvAkseN.js";import{t as l}from"./Float2BindUniform-C6b2PHzh.js";import{t as u}from"./PositionOutsideClipSpace-CLdt_M-O.js";import{t as d}from"./ShaderBuilder-8uuwgR05.js";import{t as f}from"./Texture2DUintPassUniform-B2S1A2cs.js";import{a as p,i as m,n as h,o as g,r as _,t as v}from"./QuaternionToRotationMatrix.glsl-gLTIJkSn.js";var y=class extends h{constructor(){super(...arguments),this.clipMinCameraRelative=e(),this.clipMaxCameraRelative=e(),this.minSplatRadius=-1}};function b(e){let{clippingEnabled:n,hasSlicePlane:h}=e,y=new d,{fragment:b,varyings:S,vertex:C}=y;S.add(`conic`,`vec3`),S.add(`gaussianLogAlphaCutoff`,`float`),S.add(`offsetFromCenter`,`vec2`),C.uniforms.add(new f(`splatOrderTexture`,e=>e.splatOrder),new f(`splatAtlasTexture`,e=>e.splatAtlas),new s(`minSplatRadius`,e=>e.minSplatRadius),new l(`inverseScreenSize`,({camera:e})=>t(x,1/e.fullWidth,1/e.fullHeight)),new o(`proj`,e=>e.camera.projectionMatrix),new o(`view`,e=>e.camera.viewMatrix),new l(`nearFar`,e=>e.camera.nearFar)),n&&C.uniforms.add(new r(`clipMin`,e=>e.clipMinCameraRelative),new r(`clipMax`,e=>e.clipMaxCameraRelative)),C.include(_),C.include(m),C.include(v),C.include(g),C.include(p),C.include(c,e),C.code.add(i`float safeClipW(float clipW) {
return abs(clipW) < 1e-7 ? (clipW < 0.0 ? -1e-7 : 1e-7) : clipW;
}`),C.code.add(i`vec3 computeProjectivePixelGradient(
vec3 clipGradient,
vec3 clipWGradient,
float clipValue,
float safeW,
float invWSquared,
float halfScreenSize
) {
return (clipGradient * safeW - clipValue * clipWGradient) * invWSquared * halfScreenSize;
}`),C.code.add(i`vec3 multiplyCovariance3D(float[6] covariance3D, vec3 value) {
return vec3(
covariance3D[0] * value.x + covariance3D[1] * value.y + covariance3D[2] * value.z,
covariance3D[1] * value.x + covariance3D[3] * value.y + covariance3D[4] * value.z,
covariance3D[2] * value.x + covariance3D[4] * value.y + covariance3D[5] * value.z
);
}`),C.code.add(i`vec3 computeProjectiveCovariance2D(vec3 pixelXGradient, vec3 pixelYGradient, float[6] covariance3D, mat4 view) {
mat3 worldToView = transpose(mat3(view));
vec3 axisX = worldToView * pixelXGradient;
vec3 axisY = worldToView * pixelYGradient;
vec3 covarianceAxisX = multiplyCovariance3D(covariance3D, axisX);
vec3 covarianceAxisY = multiplyCovariance3D(covariance3D, axisY);
const float regularization = 0.3;
float covarianceXX = dot(axisX, covarianceAxisX) + regularization;
float covarianceXY = dot(axisX, covarianceAxisY);
float covarianceYY = dot(axisY, covarianceAxisY) + regularization;
return vec3(covarianceXX, covarianceXY, covarianceYY);
}`),C.code.add(i`float biasDepth(float linearDepth) {
const float bias = 80.0 * .000015259;
return min(linearDepth + bias, 1.0);
}`);let w=.25,T=Math.log(w);return C.main.add(`\n    uint gaussianIndex = fetchOrderedGaussianIndex(uint(gl_InstanceID));\n    uvec4 packedGaussian = fetchPackedGaussian(gaussianIndex);\n\n    float opacity = unpackOpacity(packedGaussian);\n\n    gl_Position = ${u};\n\n    if (opacity < ${w}) {\n      return;\n    }\n\n    vec3 cameraRelativePosition = fetchGaussianCameraRelativePosition(gaussianIndex, packedGaussian);\n\n    ${a(n,i`if (cameraRelativePosition.x < clipMin.x || cameraRelativePosition.y < clipMin.y || cameraRelativePosition.z < clipMin.z ||
cameraRelativePosition.x > clipMax.x || cameraRelativePosition.y > clipMax.y || cameraRelativePosition.z > clipMax.z) {
return;
}`)}\n\n    ${a(h,i`if (rejectBySlice(cameraRelativePosition)) {
return;
}`)}\n\n    vec4 viewPos = vec4(mat3(view) * cameraRelativePosition, 1.0);\n\n    if (viewPos.z > -nearFar.x || viewPos.z < -nearFar.y) {\n      return;\n    }\n\n    vec3 covarianceA;\n    vec3 covarianceB;\n    computePackedGaussianCovariance3D(packedGaussian, covarianceA, covarianceB);\n\n    float covariance3D[6] = float[6](covarianceA.x, covarianceA.y, covarianceA.z, covarianceB.x, covarianceB.y, covarianceB.z);\n\n    vec4 projPos = proj * viewPos;\n    float safeW = safeClipW(projPos.w);\n    float invWSquared = 1.0 / (safeW * safeW);\n    vec2 halfScreenSize = 0.5 / inverseScreenSize;\n    float maxShadowSplatRadius = max(halfScreenSize.x, halfScreenSize.y);\n\n    // Projection matrix columns are the clip-space derivatives with respect to view-space xyz.\n    vec3 clipWGradient = vec3(proj[0][3], proj[1][3], proj[2][3]);\n    vec3 pixelXGradient = computeProjectivePixelGradient(\n      vec3(proj[0][0], proj[1][0], proj[2][0]),\n      clipWGradient,\n      projPos.x,\n      safeW,\n      invWSquared,\n      halfScreenSize.x\n    );\n    vec3 pixelYGradient = computeProjectivePixelGradient(\n      vec3(proj[0][1], proj[1][1], proj[2][1]),\n      clipWGradient,\n      projPos.y,\n      safeW,\n      invWSquared,\n      halfScreenSize.y\n    );\n    vec3 covariance2D = computeProjectiveCovariance2D(pixelXGradient, pixelYGradient, covariance3D, view);\n\n    float determinant = computeGaussianCovarianceDeterminant(covariance2D);\n    if (determinant <= 0.0) {\n      return;\n    }\n\n    vec2 eigenvalues = computeGaussianCovarianceEigenvalues(covariance2D);\n\n    gaussianLogAlphaCutoff = ${T} - log(opacity);\n    float gaussianEllipseThreshold = computeGaussianEllipseThreshold(gaussianLogAlphaCutoff);\n    vec2 axisLengths = computeGaussianAxisLengths(eigenvalues, gaussianEllipseThreshold);\n    float maxRadius = max(axisLengths.x, axisLengths.y);\n\n    // Avoid invalid/extremely large footprints.\n    if (maxRadius < 0.0 || maxRadius > maxShadowSplatRadius) {\n      return;\n    }\n\n    if (rejectGaussianByMinimumRadius(maxRadius, opacity, minSplatRadius)) {\n      return;\n    }\n\n    vec3 ndcPos = projPos.xyz / safeW;\n    vec2 clipSpacePixelScale = 2.0 * inverseScreenSize;\n\n    if (rejectGaussianByScreenBounds(ndcPos.xy, maxRadius, clipSpacePixelScale)) {\n      return;\n    }\n\n    offsetFromCenter = computeGaussianQuadOffset(covariance2D, eigenvalues, axisLengths, gl_VertexID);\n    conic = computeGaussianConic(covariance2D, determinant);\n    float linearDepth = (-viewPos.z - nearFar.x) / (nearFar.y - nearFar.x);\n    float biasedDepth = biasDepth(linearDepth);\n\n    vec2 clipPos = ndcPos.xy + offsetFromCenter * clipSpacePixelScale - inverseScreenSize;\n    gl_Position = vec4(clipPos, biasedDepth * 2.0 - 1.0, 1.0);\n  `),b.include(p),b.main.add(i`float gaussianExponent = evaluateGaussianExponent(conic, offsetFromCenter);
if (gaussianExponent > 0.0 || gaussianExponent < gaussianLogAlphaCutoff) {
discard;
}`),y}var x=n(),S=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatShadowPassParameters:y,build:b},Symbol.toStringTag,{value:`Module`}));export{S as n,y as r,b as t};