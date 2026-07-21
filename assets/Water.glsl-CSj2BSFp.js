import{t as e}from"./Error-CDkGhU5E.js";import{D as t}from"./vec2-C5dJMieJ.js";import{l as n}from"./vec4-B-G2J025.js";import{o as r}from"./vec4f64-CjgU5APJ.js";import{o as i}from"./vec2f64-IO40D2xB.js";import{f as a}from"./ShaderOutput-BpkC-wrv.js";import{n as o}from"./glsl-D85RBwKC.js";import{n as s,t as c}from"./View.glsl-u7L8AmT0.js";import{t as l}from"./Float4PassUniform-Cu2daSgY.js";import{t as u}from"./FloatPassUniform-DeUP8HjM.js";import{i as d}from"./Slice.glsl-CjvAkseN.js";import{t as f}from"./ObjectAndLayerIdColor.glsl-UC9jbvaT.js";import{t as p}from"./OutputHighlight.glsl-CfLvc4dK.js";import{t as m}from"./ColorConversion.glsl-C9xFjUmo.js";import{t as h}from"./Float2PassUniform-BYZ61_RB.js";import{t as g}from"./Texture2DPassUniform-CiCHIiok.js";import{t as _}from"./ShaderBuilder-8uuwgR05.js";import{t as v}from"./AlphaCutoff-Dj4-LvkI.js";import{t as y}from"./OutputColorHighlightOLID.glsl-CzPahQyj.js";import{t as b}from"./Transform.glsl-CM6cQEqg.js";import{t as x}from"./EvaluateAmbientLighting.glsl-BbYe-Nat.js";import{n as S,r as C}from"./MainLighting.glsl-BzpgU6pB.js";import{n as w}from"./ReadShadowMap.glsl-oFMVskK0.js";import{n as T,t as E}from"./WaterColor.glsl-giKw2Edh.js";import{t as D}from"./NormalUtils.glsl-BTc1OVOC.js";function O(e){e.fragment.uniforms.add(new g(`texWaveNormal`,e=>e.waveNormal),new g(`texWavePerturbation`,e=>e.wavePerturbation),new l(`waveParams`,e=>n(k,e.waveStrength,e.waveTextureRepeat,e.flowStrength,e.flowOffset)),new h(`waveDirection`,e=>t(A,e.waveDirection[0]*e.waveVelocity,e.waveDirection[1]*e.waveVelocity))),e.fragment.include(T),e.fragment.code.add(o`const vec2  FLOW_JUMP = vec2(6.0/25.0, 5.0/24.0);
vec2 textureDenormalized2D(sampler2D _tex, vec2 _uv) {
return 2.0 * texture(_tex, _uv).rg - 1.0;
}
float sampleNoiseTexture(vec2 _uv) {
return texture(texWavePerturbation, _uv).b;
}
vec3 textureDenormalized3D(sampler2D _tex, vec2 _uv) {
return 2.0 * texture(_tex, _uv).rgb - 1.0;
}
float computeProgress(vec2 uv, float time) {
return fract(time);
}
float computeWeight(vec2 uv, float time) {
float progress = computeProgress(uv, time);
return 1.0 - abs(1.0 - 2.0 * progress);
}
vec3 computeUVPerturbedWeigth(sampler2D texFlow, vec2 uv, float time, float phaseOffset) {
float flowStrength = waveParams[2];
float flowOffset = waveParams[3];
vec2 flowVector = textureDenormalized2D(texFlow, uv) * flowStrength;
float progress = computeProgress(uv, time + phaseOffset);
float weight = computeWeight(uv, time + phaseOffset);
vec2 result = uv;
result -= flowVector * (progress + flowOffset);
result += phaseOffset;
result += (time - progress) * FLOW_JUMP;
return vec3(result, weight);
}
const float TIME_NOISE_TEXTURE_REPEAT = 0.3737;
const float TIME_NOISE_STRENGTH = 7.77;
vec3 getWaveLayer(sampler2D _texNormal, sampler2D _dudv, vec2 _uv, vec2 _waveDir, float time) {
float waveStrength = waveParams[0];
vec2 waveMovement = time * -_waveDir;
float timeNoise = sampleNoiseTexture(_uv * TIME_NOISE_TEXTURE_REPEAT) * TIME_NOISE_STRENGTH;
vec3 uv_A = computeUVPerturbedWeigth(_dudv, _uv + waveMovement, time + timeNoise, 0.0);
vec3 uv_B = computeUVPerturbedWeigth(_dudv, _uv + waveMovement, time + timeNoise, 0.5);
vec3 normal_A = textureDenormalized3D(_texNormal, uv_A.xy) * uv_A.z;
vec3 normal_B = textureDenormalized3D(_texNormal, uv_B.xy) * uv_B.z;
vec3 mixNormal = normalize(normal_A + normal_B);
mixNormal.xy *= waveStrength;
mixNormal.z = sqrt(1.0 - dot(mixNormal.xy, mixNormal.xy));
return mixNormal;
}
vec4 getSurfaceNormalAndFoam(vec2 _uv, float _time) {
float waveTextureRepeat = waveParams[1];
vec3 normal = getWaveLayer(texWaveNormal, texWavePerturbation, _uv * waveTextureRepeat, waveDirection, _time);
float foam  = normals2FoamIntensity(normal, waveParams[0]);
return vec4(normal, foam);
}`)}var k=r(),A=i();function j(t){let n=new _,{vertex:r,fragment:i,varyings:h}=n,{output:g,draped:T,receiveShadows:k}=t;s(r,t),n.include(b),n.attributes.add(`position`,`vec3`),n.attributes.add(`uv0`,`vec2`);let A=new l(`waterColor`,e=>e.color);if(h.add(`vpos`,`vec3`,{invariant:!0}),r.uniforms.add(A),a(g)){if(T)return r.main.add(o`
      if (waterColor.a < ${o.float(v)}) {
        // Discard this vertex
        gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        return;
      }

      vpos = position;
      gl_Position = transformPosition(proj, view, vpos);`),i.uniforms.add(A),i.main.add(o`fragColor = waterColor;`),n;n.include(D,t),h.add(`vuv`,`vec2`),h.add(`vnormal`,`vec3`),h.add(`vtbnMatrix`,`mat3`),r.main.add(o`
      if (waterColor.a < ${o.float(v)}) {
        // Discard this vertex
        gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        return;
      }

      vuv = uv0;
      vpos = position;

      vnormal = getLocalUp(vpos, localOrigin);
      vtbnMatrix = getTBNMatrix(vnormal);

      gl_Position = transformPosition(proj, view, vpos);
      forwardLinearDepthToReadShadowMap();`)}switch(n.include(w,t),g){case 0:case 1:case 2:i.include(x,{pbrMode:0}),n.include(O),n.include(E,t),i.include(d,t),n.include(y,t),i.include(m),c(i,t),C(i),S(i),i.uniforms.add(A,new u(`timeElapsed`,({timeElapsed:e})=>e),r.uniforms.get(`view`),r.uniforms.get(`localOrigin`)).main.add(o`
        discardBySlice(vpos);
        vec3 localUp = vnormal;
        // the created normal is in tangent space
        vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);

        // we rotate the normal according to the tangent-bitangent-normal-Matrix
        vec3 n = normalize(vtbnMatrix * tangentNormalFoam.xyz);
        vec3 v = -normalize(vpos - cameraPosition);
        float shadow = ${k?o`1.0 - readShadowMap(vpos, linearDepth)`:`1.0`};
        vec4 vPosView = view * vec4(vpos, 1.0);
        vec4 final = vec4(getWaterColor(n, v, mainLightDirection, waterColor.rgb, mainLightIntensity, localUp, shadow, tangentNormalFoam.w, vPosView.xyz, vpos + localOrigin), waterColor.w);

        fragColor = delinearizeGamma(final);
        outputColorHighlightOLID(applySlice(fragColor, vpos), final.rgb);`);break;case 4:n.include(D,t),n.include(O,t),i.include(d,t),h.add(`vuv`,`vec2`),r.main.add(o`
        if (waterColor.a < ${o.float(v)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vuv = uv0;
        vpos = position;

        gl_Position = transformPosition(proj, view, vpos);`),i.uniforms.add(new u(`timeElapsed`,({timeElapsed:e})=>e)).main.add(o`discardBySlice(vpos);
vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);
tangentNormalFoam.xyz = normalize(tangentNormalFoam.xyz);
fragColor = vec4((tangentNormalFoam.xyz + vec3(1.0)) * 0.5, tangentNormalFoam.w);`);break;case 3:r.main.add(o`
        if (waterColor.a < ${o.float(v)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);`),i.include(d,t),i.main.add(`discardBySlice(vpos);`);break;case 10:n.include(p,t),r.main.add(o`
        if (waterColor.a < ${o.float(v)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);`),i.include(d,t),i.main.add(o`discardBySlice(vpos);
calculateOcclusionAndOutputHighlight();`);break;case 11:n.include(f,t),r.main.add(o`
        if (waterColor.a < ${o.float(v)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);
        forwardObjectAndLayerIdColor();`),i.include(d,t),i.main.add(o`discardBySlice(vpos);
outputObjectAndLayerIdColor();`);break;default:throw new e(`shaderbuilder:missing-output`,`Unimplemented shader output ${g} for WaterTechnique`)}return n}var M=Object.freeze(Object.defineProperty({__proto__:null,build:j},Symbol.toStringTag,{value:`Module`}));export{M as n,j as t};