import{r as e}from"./memoryEstimations-5FasCmzS.js";import{a as t,c as n,u as r}from"./vec2f64-IO40D2xB.js";import{n as i}from"./InterleavedLayout-BGWVgyHk.js";import{i as a}from"./Util-CgCGvHb_.js";import{t as o}from"./olidUtils-D_qkWUq6.js";import{n as s,t as c}from"./VisualVariablePassParameters-BC7STn1C.js";import{f as l}from"./ShaderOutput-BpkC-wrv.js";import{t as u}from"./Uniform-FnPH-ujw.js";import{t as d}from"./Float3PassUniform-YEiGS05C.js";import{n as f,t as p}from"./glsl-D85RBwKC.js";import{n as ee,r as m,t as h}from"./View.glsl-u7L8AmT0.js";import{t as g}from"./Float4PassUniform-Cu2daSgY.js";import{t as _}from"./FloatPassUniform-DeUP8HjM.js";import{i as v}from"./Slice.glsl-CjvAkseN.js";import{t as y}from"./ObjectAndLayerIdColor.glsl-UC9jbvaT.js";import{t as b}from"./OutputHighlight.glsl-CfLvc4dK.js";import{t as x}from"./Float4sPassUniform-B1UFJ1Pq.js";import{t as S}from"./FloatsPassUniform-DfJ8EJ1F.js";import{t as C}from"./ColorConversion.glsl-C9xFjUmo.js";import{t as w}from"./Float2PassUniform-BYZ61_RB.js";import{t as te}from"./IntegerPassUniform-DN8CxRD1.js";import{t as ne}from"./ShaderBuilder-8uuwgR05.js";import{t as re}from"./OutputColorHighlightOLID.glsl-CzPahQyj.js";import{t as ie}from"./Offset.glsl-DlxeJxhu.js";import{n as ae}from"./ForwardLinearDepthToWriteShadowMap.glsl-BdBeU_ay.js";import{t as T}from"./Transform.glsl-CM6cQEqg.js";import{t as E}from"./OutputDepth.glsl-C_Yal9Dw.js";import{a as D,n as O,r as k,t as A}from"./EvaluateSceneLighting.glsl-lk8xFtKS.js";import{n as j}from"./MainLighting.glsl-BzpgU6pB.js";import{t as M}from"./PiUtils.glsl-CpyVHJCx.js";import{t as N}from"./Normals.glsl-D2dK_E0k.js";import{n as P,t as F}from"./SnowCover.glsl-BNTLK0a2.js";import{n as I}from"./ReadShadowMap.glsl-oFMVskK0.js";import{t as L}from"./NormalUtils.glsl-BTc1OVOC.js";import{n as R,t as z}from"./Texture2DUintDrawUniform-BTyrpo6z.js";import{t as B}from"./TextureBackedBufferLayout-24VA8BRC.js";function V({sourceIndex:e,subdivision:t,type:n,capSide:r}){return a(e>=0&&e<=15,`invalid sourceIndex`),a(t>=0&&t<=7,`invalid subdivision`),(e&15)<<0|(t&7)<<4|(n&7)<<7|(r&1)<<10}function oe(e){return{sourceIndex:e>>0&15,subdivision:e>>4&7,type:e>>7&7,capSide:e>>10&1}}var H={0:{indexCount:20,poleCount:1,vertexCount:10},1:{indexCount:8,poleCount:4,vertexCount:8}},U=class{constructor(e){this.type=e,this.vertices=[],this.normals=[],this.indices=[],this.poles=[],this.poleIndices=[]}addVertex(e,t){return this.vertices.push(r(e)),this.normals.push(r(t)),this.vertices.length-1}addPole(e,t=null){return this.poles.push({position:r(e),normal:t?r(t):null}),this.poles.length-1}addSegment(e,t=null){this.indices.push(e.v0),this.indices.push(e.v1),t&&(this.poleIndices.push(t.v0),this.poleIndices.push(t.v1))}get numSegments(){return this.indices.length/2}translate(e,t){for(let n of this.vertices)n[0]+=e,n[1]+=t;for(let n of this.poles)n.position[0]+=e,n.position[1]+=t}get usedMemory(){return this.vertices.length*e(this.vertices[0])*2+e(this.indices)}},W={top:[0,-.5],bottom:[0,.5]};function G(e){let n=.5,r=new U(0),i={v0:0,v1:0};r.addPole(t(0,0));for(let e=0;e<10;++e){let i=2*e*Math.PI/10,a=Math.cos(i),o=Math.sin(i),s=t(a*n,o*n),c=t(a,o);r.addVertex(s,c)}for(let e=0;e<9;++e){let t={v0:e,v1:e+1};r.addSegment(t,i)}if(r.addSegment({v0:9,v1:0},i),e!==`center`){let t=W[e];r.translate(t[0],t[1])}return r}var K={center:G(`center`),top:G(`top`),bottom:G(`bottom`)},q={center:J(`center`),top:J(`top`),bottom:J(`bottom`)};function J(e){let n=new U(1),r=t(.5*-1,.5*-1),i=t(.5*1,.5*-1),a=t(.5*1,.5*1),o=t(.5*-1,.5*1),s=t(0,-1),c=t(1,0),l=t(0,1),u=t(-1,0);if(n.addPole(t(0,.5*1),l),n.addPole(t(0,.5*1)),n.addPole(t(0,.5*-1)),n.addPole(t(0,.5*-1),s),n.addVertex(r,s),n.addVertex(i,s),n.addSegment({v0:0,v1:1},{v0:3,v1:3}),n.addVertex(i,c),n.addVertex(a,c),n.addSegment({v0:2,v1:3},{v0:2,v1:1}),n.addVertex(a,l),n.addVertex(o,l),n.addSegment({v0:4,v1:5},{v0:0,v1:0}),n.addVertex(o,u),n.addVertex(r,u),n.addSegment({v0:6,v1:7},{v0:1,v1:2}),e!==`center`){let t=W[e];n.translate(t[0],t[1])}return n}function se(){let e=i().u32(`pathVertexInfo`,{integer:!0}).u32(`textureElementIndex`,{integer:!0});return o()&&e.vec4u8(`olidColor`),e.freeze()}function Y(e){let t=[{type:`vec3f32`,name:`position`},{type:`vec2snorm16`,name:`profileRight`},{type:`vec2snorm16`,name:`profileUp`}];return e.upVectorAlignment===1&&t.push({type:`vec2snorm16`,name:`pathRotationUp`}),e.hasVVSize&&t.push({type:`f32`,name:`sizeFeatureAttribute`}),e.hasVVColor&&t.push({type:`f32`,name:`colorFeatureAttribute`}),e.hasVVOpacity&&t.push({type:`f32`,name:`opacityFeatureAttribute`}),t.push({type:`f16`,name:`pathMaxStretchDistance`},{type:`snorm16`,name:`profileRotation`}),new B(t)}function ce(e){let{attributes:t,vertex:n}=e;t.add(`pathVertexInfo`,`uint`),n.constants.add(`pathVertexInfoSourceIndexShift`,`uint`,0),n.constants.add(`pathVertexInfoSourceIndexMask`,`uint`,15),n.constants.add(`pathVertexInfoSubdivisionShift`,`uint`,4),n.constants.add(`pathVertexInfoSubdivisionMask`,`uint`,7),n.constants.add(`pathVertexInfoTypeShift`,`uint`,7),n.constants.add(`pathVertexInfoTypeMask`,`uint`,7),n.constants.add(`pathVertexInfoCapSideShift`,`uint`,10),n.constants.add(`pathVertexInfoCapSideMask`,`uint`,1),n.constants.add(`pathVertexCapSideEnd`,`uint`,1),n.code.add(f`struct PathVertexInfo {
uint sourceIndex;
float subdivision;
uint type;
bool isEnd;
};
PathVertexInfo decodePathVertexInfo() {
uint sourceIndex = (pathVertexInfo >> pathVertexInfoSourceIndexShift) & pathVertexInfoSourceIndexMask;
uint subdivision = (pathVertexInfo >> pathVertexInfoSubdivisionShift) & pathVertexInfoSubdivisionMask;
uint type = (pathVertexInfo >> pathVertexInfoTypeShift) & pathVertexInfoTypeMask;
uint capSide = (pathVertexInfo >> pathVertexInfoCapSideShift) & pathVertexInfoCapSideMask;
return PathVertexInfo(
sourceIndex,
float(subdivision),
type,
capSide == pathVertexCapSideEnd
);
}`)}var X=class extends u{constructor(e,t,n,r){super(e,`vec2`,1,(t,i,a)=>t.setUniform2fv(e,n(i,a),r),t)}},Z=class extends u{constructor(e,t,n){super(e,`int`,1,(t,r,i)=>t.setUniform1iv(e,n(r,i)),t)}};function le(e,t){let{vertex:n}=e;e.include(ce);let r=t.upVectorAlignment===1;n.uniforms.add(new _(`angleCutoff`,e=>e.cutoffAngle)),n.code.add(f`float reciprocalClamped(float value) {
float signValue = value < 0.0 ? -1.0 : 1.0;
return signValue / max(abs(value), 1e-6);
}`),r?n.code.add(f`vec2 applyMiterStretch(vec2 vertex, float rotationAngle, vec2 rotationRight) {
if (rotationAngle == 0.0) {
return vertex;
}
float k = reciprocalClamped(cos(0.5 * rotationAngle));
mat2 miterStretch = mat2(
1. + (k - 1.) * rotationRight.x * rotationRight.x,
(k - 1.) * rotationRight.x * rotationRight.y,
(k - 1.) * rotationRight.x * rotationRight.y,
1. + (k - 1.) * rotationRight.y * rotationRight.y
);
return miterStretch * vertex;
}`):n.code.add(f`vec2 applyMiterStretch(vec2 vertex, float rotationAngle) {
if (rotationAngle == 0.0) {
return vertex;
}
float k = reciprocalClamped(cos(0.5 * rotationAngle));
return vec2(k, 1.) * vertex;
}`);let{vertexCount:i,indexCount:a,poleCount:o}=H[t.pathProfileType];switch(n.uniforms.add(new X(`pathProfileVertices`,i,e=>e.profile.vertices.flat()),new X(`pathProfileNormals`,i,e=>e.profile.normals.flat())),n.code.add(f`mat3 mat3FromRotation(float angle, vec3 axis) {
float x = axis.x;
float y = axis.y;
float z = axis.z;
float s = sin(angle);
float c = cos(angle);
float t = 1.0 - c;
return mat3(
x * x * t + c,      y * x * t + z * s,  z * x * t - y * s,
x * y * t - z * s,  y * y * t + c,      z * y * t + x * s,
x * z * t + y * s,  y * z * t - x * s,  z * z * t + c
);
}`),n.code.add(f`struct ExtrusionFrame {
vec3 up;
vec3 right;
};
struct ExtrudedVertex {
ExtrusionFrame frame;
vec2 profileVertex;
vec2 profileNormal;
vec2 rotationRight;
float maxDistance;
float capPositionOffset;
float capNormalOffset;
bool isCap;
};`),r?n.code.add(f`vec2 getPathRotationRight(ExtrusionFrame frame) {
vec3 rotationUp = getFrameRotationUp();
float a = dot(rotationUp, frame.up);
float b = dot(rotationUp, frame.right);
vec3 vertex = normalize(frame.up * -b + frame.right * a);
return vec2(dot(vertex, frame.right), dot(vertex, frame.up));
}`):n.code.add(f`vec2 getPathRotationRight() {
return vec2(1., 0.);
}`),n.constants.add(`pathVertexTypeJoin`,`uint`,0),n.uniforms.add(new te(`numJoinSubdivisions`,e=>e.numJoinSubdivisions)),n.code.add(f`
      ExtrudedVertex evaluateJoinVertex(PathVertexInfo vertexInfo, ExtrusionFrame frame) {
        vec2 profileVertex = pathProfileVertices[vertexInfo.sourceIndex];
        vec2 profileNormal = pathProfileNormals[vertexInfo.sourceIndex];
        float profileRotation = getProfileRotation();
        vec2 rotationRight = getPathRotationRight(${p(r,f`frame`)});
        bool isBevel = abs(profileRotation) >= angleCutoff;

        // determine if the current profile vertex is on the inside or outside of the rotationAxis
        // this determines if the geometry folds inwards or is bend outwards
        float b = dot(profileVertex, rotationRight);
        bool isBend = b * profileRotation >= 0.;

        bool isBevelBend = isBevel && isBend;

        if (isBevelBend) {
          float k = vertexInfo.subdivision;
          // rotate half rotation angle backwards to where the rotation starts
          // and then rotate a couple of times depending on the current subdivision segment
          float bendRotation = -profileRotation * 0.5 + (k * profileRotation) / float(numJoinSubdivisions);
          if (bendRotation != 0.) {
            vec3 rotationUp = getFrameRotationUp();
            mat3 transform  = mat3FromRotation(bendRotation, rotationUp);
            ${p(r,f`frame.up = normalize(transform * frame.up);`)}
            frame.right = normalize(transform * frame.right);
          }
        } else {
          profileVertex = applyMiterStretch(
            profileVertex,
            profileRotation${p(r,f`,
              rotationRight`)}
          );
        }

        rotationRight = isBend ? vec2(0.) : rotationRight;
        float maxDistance = isBend
        ? 0.
        : getMaxStretchDistance();

        return ExtrudedVertex(
          frame,
          profileVertex,
          profileNormal,
          rotationRight,
          maxDistance,
          0.,
          0.,
          false
        );
      }
    `),n.constants.add(`pathVertexTypeCapConnectingProfile`,`uint`,1),n.code.add(f`
        ExtrudedVertex evaluateConnectingVertex(PathVertexInfo vertexInfo, ExtrusionFrame frame) {
          vec2 profileVertex = pathProfileVertices[vertexInfo.sourceIndex];
          vec2 profileNormal = pathProfileNormals[vertexInfo.sourceIndex];

          float profilePlaneVertexOffset = ${p(t.pathCapType===2,f`vertexInfo.isEnd ? 0.5 : -0.5`,f`0.`)};

          return ExtrudedVertex(
            frame,
            profileVertex,
            profileNormal,
            vec2(0.),
            0.,
            profilePlaneVertexOffset,
            0.,
            true
          );
        }
    `),t.pathCapType){case 1:case 2:n.constants.add(`pathVertexTypeFlatCapProfile`,`uint`,2),n.code.add(f`
          ExtrudedVertex evaluateFlatCapVertex(PathVertexInfo vertexInfo, ExtrusionFrame frame) {
            vec2 profileVertex = pathProfileVertices[vertexInfo.sourceIndex];
            bool isEnd = vertexInfo.isEnd;
            float normalOffset = isEnd ? 1. : -1.;
            float profilePlaneOffset = ${p(t.pathCapType===2,f`isEnd ? 0.5 : -0.5`,f`0.0`)};
            vec2 normal = vec2(0.);

            return ExtrudedVertex(
              frame,
              profileVertex,
              normal,
              vec2(0.),
              0.,
              profilePlaneOffset,
              normalOffset,
              true
            );
          }
        `);break;case 3:n.uniforms.add(new x(`pathProfilePoles`,o,e=>e.profile.poles.flatMap(({position:e,normal:t})=>[...e,...t??ue]),{supportsNaN:!0}),new Z(`pathProfilePoleIndices`,a,e=>e.profile.poleIndices)),n.include(M),n.constants.add(`pathVertexTypeRoundCapPole`,`uint`,3),n.constants.add(`pathVertexTypeRoundCapInnerProfile`,`uint`,4),n.constants.add(`pathNumRoundCapExtrusionSubdivisions`,`float`,3),n.code.add(f`ExtrudedVertex evaluateRoundCapPoleVertex(PathVertexInfo vertexInfo, ExtrusionFrame frame) {
bool isEnd = vertexInfo.isEnd;
float capSign = isEnd ? 1. : -1.;
float offsetScale = capSign * 0.5;
vec4 pole = pathProfilePoles[vertexInfo.sourceIndex];
vec2 polePosition = pole.xy;
bool hasPoleNormal = !isnan(pole.z);
vec2 poleNormal = hasPoleNormal ? pole.zw : vec2(0.);
float normalOffset = hasPoleNormal ? 0. : capSign;
return ExtrudedVertex(
frame,
polePosition,
poleNormal,
vec2(0.),
0.,
offsetScale,
normalOffset,
true
);
}
ExtrudedVertex evaluateRoundCapInnerVertex(PathVertexInfo vertexInfo, ExtrusionFrame frame) {
bool isEnd = vertexInfo.isEnd;
float capSign = isEnd ? 1. : -1.;
float offsetScale = capSign * 0.5;
float subdivision = vertexInfo.subdivision;
float t = 1. - (subdivision + 1.) / pathNumRoundCapExtrusionSubdivisions;
float theta = t * HALF_PI;
float t1 = sin(theta);
float t2 = cos(theta);
int poleIndex = pathProfilePoleIndices[vertexInfo.sourceIndex];
vec4 pole = pathProfilePoles[poleIndex];
vec2 polePosition = pole.xy;
bool hasPoleNormal = !isnan(pole.z);
vec2 profileVertex = pathProfileVertices[vertexInfo.sourceIndex];
vec2 poleOffsetScaled = (profileVertex - polePosition) * t1;
vec2 poleVertex = poleOffsetScaled + polePosition;
vec2 profileNormal = hasPoleNormal
? pole.zw
: normalize(poleOffsetScaled) * t1;
float normalOffset = hasPoleNormal ? 0. : capSign * t2;
return ExtrudedVertex(
frame,
poleVertex,
profileNormal,
vec2(0.),
0.,
offsetScale * t2,
normalOffset,
true
);
}`)}n.code.add(f`
      ExtrudedVertex evaluateVertex() {
        PathVertexInfo vertexInfo = decodePathVertexInfo();
        ExtrusionFrame frame = ExtrusionFrame(
          getFrameUp(),
          getFrameRight()
        );

        switch (vertexInfo.type) {
          case pathVertexTypeJoin:
            return evaluateJoinVertex(vertexInfo, frame);

          case pathVertexTypeCapConnectingProfile:
            return evaluateConnectingVertex(vertexInfo, frame);

          ${p(t.pathCapType===1||t.pathCapType===2,f`
          case pathVertexTypeFlatCapProfile:
            return evaluateFlatCapVertex(vertexInfo, frame);
          `)}

          ${p(t.pathCapType===3,f`
          case pathVertexTypeRoundCapPole:
            return evaluateRoundCapPoleVertex(vertexInfo, frame);
          case pathVertexTypeRoundCapInnerProfile:
            return evaluateRoundCapInnerVertex(vertexInfo, frame);
          `)}

          default:
            return ExtrudedVertex(
              frame,
              vec2(0.),
              vec2(0.),
              vec2(0.),
              0.,
              0.,
              0.,
              false
            );
        }
      }
    `)}var ue=n(NaN,NaN),Q=8;function de(e,t){let{attributes:n,vertex:r}=e,i=new z(`componentTextureBuffer`,e=>e.textureBuffer),a=new R({layout:Y(t),itemIndexAttribute:`textureElementIndex`,bufferUniform:i});e.include(a.TextureBackedBufferModule,t),n.add(`textureElementIndex`,`uint`),r.uniforms.add(new w(`size`,e=>e.size));let{hasVVSize:o,hasVVColor:c,hasVVOpacity:l}=t;o?(r.uniforms.add(new d(`vvSizeMinSize`,e=>e.vvSize.minSize),new d(`vvSizeMaxSize`,e=>e.vvSize.maxSize),new d(`vvSizeOffset`,e=>e.vvSize.offset),new d(`vvSizeFactor`,e=>e.vvSize.factor),new d(`vvSizeFallback`,e=>e.vvSize.fallback)),r.code.add(f`
    vec2 getSize() {
      float value = ${a.getTextureAttribute(`sizeFeatureAttribute`)};
      if (isnan(value)) {
        return vvSizeFallback.xz;
      }
      return size * clamp(vvSizeOffset + value * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).xz;
    }
    `)):r.code.add(f`vec2 getSize(){
return size;
}`),l?(r.constants.add(`vvOpacityNumber`,`int`,Q),r.uniforms.add(new S(`vvOpacityValues`,Q,e=>e.vvOpacity.values),new S(`vvOpacityOpacities`,Q,e=>e.vvOpacity.opacityValues),new _(`vvOpacityFallback`,e=>e.vvOpacity.fallback,{supportsNaN:!0})),r.code.add(f`
    vec4 applyOpacity(vec4 color) {
      // if we encounter NaN in the color it means the color is in the fallback case where the symbol color
      // is not defined and there is no valid color visual variable override. In this case just return a fully
      // transparent color
      if (isnan(color.r)) {
        return vec4(0);
      }

      float value = ${a.getTextureAttribute(`opacityFeatureAttribute`)};

      if (isnan(value)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${p(c,`color`,`vec4(color.rgb, vvOpacityFallback)`)};
      }

      if (value <= vvOpacityValues[0]) {
        return vec4(color.rgb, vvOpacityOpacities[0]);
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return vec4(color.rgb, mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f));
        }
      }

      return vec4( color.rgb, vvOpacityOpacities[vvOpacityNumber - 1]);
    }
    `)):r.code.add(f`vec4 applyOpacity(vec4 color){
return color;
}`),c?(r.constants.add(`vvColorNumber`,`int`,s),r.uniforms.add(new S(`vvColorValues`,s,e=>e.vvColor.values),new x(`vvColorColors`,s,e=>e.vvColor.colors),new g(`vvColorFallback`,e=>e.vvColor.fallback)),r.code.add(f`
    vec4 getColor() {
      float value = ${a.getTextureAttribute(`colorFeatureAttribute`)};
      if (isnan(value)) {
        return applyOpacity(vvColorFallback);
      }

      if (value <= vvColorValues[0]) {
        return applyOpacity(vvColorColors[0]);
      }

      for (int i = 1; i < vvColorNumber; ++i) {
        if (vvColorValues[i] >= value) {
          float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
          return applyOpacity(mix(vvColorColors[i-1], vvColorColors[i], f));
        }
      }

      return applyOpacity(vvColorColors[vvColorNumber - 1]);
    }
    `)):r.code.add(f`vec4 getColor(){
return applyOpacity(vec4(1, 1, 1, 1));
}`),r.include(M),r.code.add(f`
    vec3 decompressAxis(vec2 axis) {
      float z = 1.0 - abs(axis.x) - abs(axis.y);
      return normalize(vec3(axis + sign(axis) * min(z, 0.0), z));
    }

    float getProfileRotation() {
      return PI * ${a.getTextureAttribute(`profileRotation`)};
    }

    float getMaxStretchDistance() {
      return ${a.getTextureAttribute(`pathMaxStretchDistance`)};
    }

    vec3 getFrameUp() {
      return decompressAxis(${a.getTextureAttribute(`profileUp`)});
    }

    vec3 getFrameRight() {
      return decompressAxis(${a.getTextureAttribute(`profileRight`)});
    }
  `),r.code.add(f`
    vec3 getFrameRotationUp() {
      return ${t.upVectorAlignment===1?f`decompressAxis(${a.getTextureAttribute(`pathRotationUp`)})`:f`getFrameUp()`};
    }
  `),e.include(le,t),r.code.add(f`
  vec3 calculateVPos(ExtrudedVertex extrudedVertex) {
    vec2 size = getSize();
    vec3 origin = ${a.getTextureAttribute(`position`)};
    vec3 right = extrudedVertex.frame.right;
    vec3 up = extrudedVertex.frame.up;
    vec2 profileVertex = extrudedVertex.profileVertex * size;
    `),r.code.add(f`if(extrudedVertex.isCap) {
float positionOffsetAlongProfilePlaneNormal = extrudedVertex.capPositionOffset * size[0];
vec3 forward = cross(up, right);
vec3 offset = right * profileVertex.x + up * profileVertex.y + forward * positionOffsetAlongProfilePlaneNormal;
return origin + offset;
}
vec2 rotationRight = extrudedVertex.rotationRight;
float maxDistance = extrudedVertex.maxDistance;`),r.code.add(f`rotationRight *= size;
rotationRight = length(rotationRight) > 0.0 ? normalize(rotationRight) : vec2(0, 0);
float rx = dot(profileVertex, rotationRight);
if (abs(rx) > maxDistance) {
vec2 rotationUp = vec2(-rotationRight.y, rotationRight.x);
float ry = dot(profileVertex, rotationUp);
profileVertex = rotationRight * maxDistance * sign(rx) + rotationUp * ry;
}
vec3 offset = right * profileVertex.x + up * profileVertex.y;
return origin + offset;
}`),r.code.add(f`vec3 localNormal(ExtrudedVertex extrudedVertex) {
vec3 right = extrudedVertex.frame.right;
vec3 up = extrudedVertex.frame.up;
vec2 profileNormal = extrudedVertex.profileNormal;
vec3 normal = right * profileNormal.x + up * profileNormal.y;
if(extrudedVertex.isCap) {
vec3 forward = cross(up, right);
normal += forward * extrudedVertex.capNormalOffset;
}
return normal;
}`)}var fe=class extends c{constructor(){super(...arguments),this.numJoinSubdivisions=1,this.size=t(1,1),this.cutoffAngle=0,this.profile=K.center}};function $(e){let t=new ne,{vertex:n,fragment:r,varyings:i}=t;ee(n,e),i.add(`vpos`,`vec3`,{invariant:!0}),t.include(de,e);let{output:a,spherical:o,pbrMode:s,snowCover:c,offsetBackfaces:u}=e;switch((l(a)||a===11)&&(t.include(T),t.include(I,e),t.include(y,e),u&&(h(n,e),t.include(ie)),i.add(`vnormal`,`vec3`),i.add(`vcolor`,`vec4`),n.main.add(f`
      ExtrudedVertex extrudedVertex = evaluateVertex();
      vpos = calculateVPos(extrudedVertex);
      vnormal = normalize(localNormal(extrudedVertex));
      gl_Position = transformPosition(proj, view, vpos);
      ${p(u,`gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vnormal, cameraPosition);`)}

      forwardObjectAndLayerIdColor();
      vcolor = getColor();
      forwardLinearDepthToReadShadowMap();`)),a){case 0:case 1:case 2:t.include(P,e),r.include(k,e),r.include(D,e),t.include(N,e),r.include(v,e),t.include(re,e),h(r,e),O(r),A(r),r.uniforms.add(n.uniforms.get(`localOrigin`),new d(`ambient`,e=>e.ambient),new d(`diffuse`,e=>e.diffuse),new _(`opacity`,e=>e.opacity)),r.include(C),r.include(F,e),j(r),r.main.add(f`
        discardBySlice(vpos);

        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        shadingParams.normalView = vnormal;
        vec3 normal = shadingNormal(shadingParams);
        float ssao = evaluateAmbientOcclusionInverse();

        vec3 posWorld = vpos + localOrigin;
        vec3 normalGround = ${o?`normalize(posWorld);`:`vec3(0.0, 0.0, 1.0);`}

        vec3 albedo = vcolor.rgb * max(ambient, diffuse); // combine the old material parameters into a single one
        float combinedOpacity = vcolor.a * opacity;

        ${p(c,f`float snow = getSnow(normal, normalGround);
                 albedo = mix(albedo, vec3(1), snow);
                 ssao = mix(ssao, 1.0, snow);`)}

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        float shadow = readShadow(additionalAmbientScale, vpos);

        ${p(s===2,`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];\n           ${p(c,`mrr = applySnowToMRR(mrr, snow);`)}`)}

        vec3 shadedColor = ${s===2?`evaluateSceneLightingPBR(normal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, additionalAmbientIrradiance);`:`evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        vec4 finalColor = vec4(shadedColor, combinedOpacity);
        outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${p(c,`, snow`)});`);break;case 3:t.include(T),n.main.add(f`ExtrudedVertex extrudedVertex = evaluateVertex();
vpos = calculateVPos(extrudedVertex);
gl_Position = transformPosition(proj, view, vpos);`),t.fragment.include(v,e),r.main.add(f`discardBySlice(vpos);`);break;case 5:case 6:case 7:case 8:t.include(T),ae(t),i.add(`depth`,`float`),n.main.add(f`ExtrudedVertex extrudedVertex = evaluateVertex();
vpos = calculateVPos(extrudedVertex);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);`),t.fragment.include(v,e),t.include(E,e),r.main.add(f`discardBySlice(vpos);
outputDepth(depth);`);break;case 11:t.fragment.include(v,e),r.main.add(f`discardBySlice(vpos);
outputObjectAndLayerIdColor();`);break;case 4:t.include(T),t.include(L,e),m(n),i.add(`vnormal`,`vec3`),n.main.add(f`ExtrudedVertex extrudedVertex = evaluateVertex();
vpos = calculateVPos(extrudedVertex);
vnormal = normalize((viewNormal * vec4(localNormal(extrudedVertex), 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);`),t.fragment.include(v,e),r.main.add(f`discardBySlice(vpos);
vec3 normal = normalize(vnormal);
if (gl_FrontFacing == false) normal = -normal;
fragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);`);break;case 10:t.include(T),t.include(L,e),i.add(`vnormal`,`vec3`),n.main.add(f`ExtrudedVertex extrudedVertex = evaluateVertex();
vpos = calculateVPos(extrudedVertex);
gl_Position = transformPosition(proj, view, vpos);`),t.fragment.include(v,e),t.include(b,e),r.main.add(f`discardBySlice(vpos);
calculateOcclusionAndOutputHighlight();`)}return t}var pe=Object.freeze(Object.defineProperty({__proto__:null,build:$},Symbol.toStringTag,{value:`Module`}));export{se as a,V as c,Y as i,oe as l,pe as n,K as o,fe as r,q as s,$ as t};