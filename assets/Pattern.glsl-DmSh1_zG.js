import{r as e}from"./tslib.es6-qUHyP9zl.js";import{n as t}from"./InterleavedLayout-BGWVgyHk.js";import{t as n}from"./olidUtils-D_qkWUq6.js";import{n as r,t as i}from"./glsl-D85RBwKC.js";import{t as a}from"./FloatBindUniform-C4h6J6-v.js";import{n as o,t as s}from"./View.glsl-u7L8AmT0.js";import{t as c}from"./Float4PassUniform-Cu2daSgY.js";import{n as l}from"./ShaderTechniqueConfiguration-DvmPjakj.js";import{i as u}from"./Slice.glsl-CjvAkseN.js";import{t as d}from"./ObjectAndLayerIdColor.glsl-UC9jbvaT.js";import{t as f}from"./VisualVariables.glsl-Co37YOvb.js";import{t as p}from"./ColorConversion.glsl-C9xFjUmo.js";import{t as m}from"./ShaderBuilder-8uuwgR05.js";import{t as h}from"./OutputColorHighlightOLID.glsl-CzPahQyj.js";import{t as g}from"./TriangleTechniqueConfiguration-g8e8fJvc.js";import{t as _}from"./Transform.glsl-CM6cQEqg.js";import{t as v}from"./VertexColor.glsl-DrV8C2l2.js";import{n as y,t as b}from"./Texture2DUintDrawUniform-BTyrpo6z.js";import{t as x}from"./TextureBackedBufferLayout-24VA8BRC.js";var S=class extends g{constructor(){super(...arguments),this.cullFace=0,this.style=0,this.emissionSource=0,this.hasVertexColors=!1,this.hasOccludees=!1,this.hasVVColor=!1,this.draped=!1,this.textureCoordinateType=0,this.discardInvisibleFragments=!0,this.writeDepth=!0,this.hasVVInstancing=!1,this.hasVVSize=!1,this.hasVVOpacity=!1,this.overlayEnabled=!1,this.snowCover=!1}};function C(e,t,n,r){return e.draped?null:e.hasVVColor?r:e.hasVertexColors?n:t}e([l({count:3})],S.prototype,`cullFace`,void 0),e([l({count:6})],S.prototype,`style`,void 0),e([l({count:8})],S.prototype,`emissionSource`,void 0),e([l()],S.prototype,`hasVertexColors`,void 0),e([l()],S.prototype,`hasOccludees`,void 0),e([l()],S.prototype,`hasVVColor`,void 0),e([l()],S.prototype,`draped`,void 0);function w(e){let r=t().vec3f(`position`).vec4f(`uvMapSpace`);return e.draped?e.hasVVColor?r.f32(`colorFeatureAttribute`):e.hasVertexColors&&r.vec4u8(`color`,{glNormalized:!0}):r.u32(`textureElementIndex`,{integer:!0}),n()&&r.vec4u8(`olidColor`),r.freeze()}var T=[{type:`mat3f32`,name:`boundingRect`}],E=new x(T),D=new x([...T,{type:`vec4unorm8`,name:`color`}]),O=new x([...T,{type:`f32`,name:`colorFeatureAttribute`}]);function k(e){return C(e,E,D,O)}var A=new b(`componentTextureBuffer`,e=>e.textureBuffer),j=new y({layout:E,itemIndexAttribute:`textureElementIndex`,bufferUniform:A}),M=new y({layout:D,itemIndexAttribute:`textureElementIndex`,bufferUniform:A}),N=new y({layout:O,itemIndexAttribute:`textureElementIndex`,bufferUniform:A,enableNaNSupport:!0});function P(e){return C(e,j,M,N)}var F=.70710678118,I=F,L=.08715574274,R=10,z=1;function B(e){let t=P(e),n=t!=null,l=new m;n&&l.include(t.TextureBackedBufferModule,e);let{vertex:g,fragment:y,attributes:b,varyings:x}=l,S=e.output===10;o(g,e),l.include(_);let C=``;n?(e.hasVVColor&&(C=t.getTextureAttribute(`colorFeatureAttribute`)),e.hasVertexColors?(l.varyings.add(`vColor`,`vec4`),l.vertex.code.add(r`void forwardVertexColor() { vColor = ${t.getTextureAttribute(`color`)}; }`)):l.vertex.code.add(r`void forwardVertexColor() {}`),b.add(`textureElementIndex`,`uint`)):(l.include(v,e),e.hasVVColor&&(b.add(`colorFeatureAttribute`,`float`),C=`colorFeatureAttribute`)),b.add(`position`,`vec3`),g.inputs.add(`position`,()=>`position`),l.include(f,e),l.include(d,e),y.include(u,e),l.include(h,e),e.draped&&g.uniforms.add(new a(`worldToScreenRatio`,e=>1/e.screenToPCSRatio)),b.add(`uvMapSpace`,`vec4`),e.hasVertexColors||x.add(`vColor`,`vec4`),x.add(`vpos`,`vec3`,{invariant:!0}),x.add(`vuv`,`vec2`),g.uniforms.add(new c(`uColor`,e=>e.color));let w=e.style===3||e.style===4||e.style===5;return w&&g.code.add(r`
      const mat2 rotate45 = mat2(${r.float(F)}, ${r.float(-.70710678118)},
                                 ${r.float(I)}, ${r.float(F)});
    `),!e.draped&&n&&(s(g,e),g.uniforms.add(new a(`worldToScreenPerDistanceRatio`,e=>1/e.camera.perScreenPixelRatio)),g.code.add(r`vec3 projectPointToLineSegment(vec3 center, vec3 halfVector, vec3 point) {
float projectedLength = dot(halfVector, point - center) / dot(halfVector, halfVector);
return center + halfVector * clamp(projectedLength, -1.0, 1.0);
}`),g.code.add(r`vec3 intersectRayPlane(vec3 rayDir, vec3 rayOrigin, vec3 planeNormal, vec3 planePoint) {
float d = dot(planeNormal, planePoint);
float t = (d - dot(planeNormal, rayOrigin)) / dot(planeNormal, rayDir);
return rayOrigin + t * rayDir;
}`),g.code.add(r`
      float boundingRectDistanceToCamera() {
        vec3 center = ${t.getTextureAttribute(`boundingRect`)}[0];
        vec3 halfU = ${t.getTextureAttribute(`boundingRect`)}[1];
        vec3 halfV = ${t.getTextureAttribute(`boundingRect`)}[2];
        vec3 n = normalize(cross(halfU, halfV));

        vec3 viewDir = - vec3(view[0][2], view[1][2], view[2][2]);

        float viewAngle = dot(viewDir, n);
        float minViewAngle = ${r.float(L)};

        if (abs(viewAngle) < minViewAngle) {
          // view direction is (almost) parallel to plane -> clamp it to min angle
          float normalComponent = sign(viewAngle) * minViewAngle - viewAngle;
          viewDir = normalize(viewDir + normalComponent * n);
        }

        // intersect view direction with infinite plane that contains bounding rect
        vec3 planeProjected = intersectRayPlane(viewDir, cameraPosition, n, center);

        // clip to bounds by projecting to u and v line segments individually
        vec3 uProjected = projectPointToLineSegment(center, halfU, planeProjected);
        vec3 vProjected = projectPointToLineSegment(center, halfV, planeProjected);

        // use to calculate the closest point to camera on bounding rect
        vec3 closestPoint = uProjected + vProjected - center;

        return length(closestPoint - cameraPosition);
      }
    `)),g.code.add(r`
    vec2 scaledUV() {
      vec2 uv = uvMapSpace.xy ${i(w,` * rotate45`)};
      vec2 uvCellOrigin = uvMapSpace.zw ${i(w,` * rotate45`)};

      ${i(!e.draped,r`float distanceToCamera = boundingRectDistanceToCamera();
               float worldToScreenRatio = worldToScreenPerDistanceRatio / distanceToCamera;`)}

      // Logarithmically discretize ratio to avoid jittering
      float step = 0.1;
      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);

      vec2 uvOffset = mod(uvCellOrigin * discreteWorldToScreenRatio, ${r.float(R)});
      return uvOffset + (uv * discreteWorldToScreenRatio);
    }
  `),g.main.add(r`
    vuv = scaledUV();
    vpos = position;
    forwardVertexColor();
    forwardObjectAndLayerIdColor();
    ${e.hasVertexColors?`vColor *= uColor;`:e.hasVVColor?r`vColor = uColor * interpolateVVColor(${C});`:`vColor = uColor;`}
    gl_Position = transformPosition(proj, view, vpos);
  `),y.include(p),e.draped&&y.uniforms.add(new a(`texelSize`,e=>1/e.camera.pixelRatio)),S||(y.code.add(r`
      const float lineWidth = ${r.float(z)};
      const float spacing = ${r.float(R)};
      const float spacingINV = ${r.float(1/R)};

      float coverage(float p, float txlSize) {
        p = mod(p, spacing);

        float halfTxlSize = txlSize / 2.0;

        float start = p - halfTxlSize;
        float end = p + halfTxlSize;

        float coverage = (ceil(end * spacingINV) - floor(start * spacingINV)) * lineWidth;
        coverage -= min(lineWidth, mod(start, spacing));
        coverage -= max(lineWidth - mod(end, spacing), 0.0);

        return coverage / txlSize;
      }
    `),e.draped||y.code.add(r`const int maxSamples = 5;
float sampleAA(float p) {
vec2 dxdy = abs(vec2(dFdx(p), dFdy(p)));
float fwidth = dxdy.x + dxdy.y;
ivec2 samples = 1 + ivec2(clamp(dxdy, 0.0, float(maxSamples - 1)));
vec2 invSamples = 1.0 / vec2(samples);
float accumulator = 0.0;
for (int j = 0; j < maxSamples; j++) {
if(j >= samples.y) {
break;
}
for (int i = 0; i < maxSamples; i++) {
if(i >= samples.x) {
break;
}
vec2 step = vec2(i,j) * invSamples - 0.5;
accumulator += coverage(p + step.x * dxdy.x + step.y * dxdy.y, fwidth);
}
}
accumulator /= float(samples.x * samples.y);
return accumulator;
}`)),y.main.add(r`
    discardBySlice(vpos);
    vec4 color = vColor;
    ${i(!S,r`color.a *= ${V(e)};`)}
    outputColorHighlightOLID(applySlice(color, vpos), color.rgb);
  `),l}function V(e){function t(t){return e.draped?r`coverage(vuv.${t}, texelSize)`:r`sampleAA(vuv.${t})`}switch(e.style){case 3:case 0:return t(`y`);case 4:case 1:return t(`x`);case 5:case 2:return r`1.0 - (1.0 - ${t(`x`)}) * (1.0 - ${t(`y`)})`;default:return`0.0`}}var H=Object.freeze(Object.defineProperty({__proto__:null,build:B},Symbol.toStringTag,{value:`Module`}));export{S as a,w as i,B as n,k as r,H as t};