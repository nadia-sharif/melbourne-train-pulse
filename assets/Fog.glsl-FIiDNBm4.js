import{c as e}from"./vec3f64-DIOQknMY.js";import{t}from"./Float3PassUniform-YEiGS05C.js";import{n,t as r}from"./glsl-D85RBwKC.js";import{t as i}from"./FloatPassUniform-DeUP8HjM.js";import{t as a}from"./Texture2DBindUniform-4_yYNByJ.js";import{t as o}from"./ReadDepth.glsl-Ca_0z8Pl.js";import{t as s}from"./Texture2DPassUniform-CiCHIiok.js";import{t as c}from"./ShaderBuilder-8uuwgR05.js";import{t as l}from"./Gamma.glsl-BiRghhbe.js";import{n as u}from"./oitResolution.glsl-DHGKUwhe.js";import{t as d}from"./ToneMapping.glsl-BO4QToFy.js";import{t as f}from"./ScreenSpacePassAtmosphere.glsl-BUOp4Xvv.js";import{n as p,t as m}from"./DistanceFalloff.glsl-BirP-hBU.js";var h=class extends m{constructor(){super(...arguments),this.color=e(),this.strength=0,this.amount=0,this.fogColorDistanceWeight=.85}};function g(e){let m=new c;m.include(f,{needUVs:!0,needEyeDirection:!0});let h=m.fragment,{hasEmissive:g}=e;return h.uniforms.add(new a(`depthTexture`,e=>e.mainDepth),new i(`fogStrength`,e=>e.strength),new i(`fogAmount`,e=>e.amount),new t(`fogColor`,e=>e.color),new i(`fogColorDistanceWeight`,e=>e.fogColorDistanceWeight)),g&&h.uniforms.add(new s(`emissionTexture`,e=>e.emission?.attachment)),h.include(p),h.include(l),h.include(d),h.include(o),h.include(u,e),h.main.add(n`
    vec3 rayDir = normalize(worldRay);
    float mainDepth = -1.0;

    float depthSample = depthFromTexture(depthTexture, uv);
    if(depthSample < 1.0 && depthSample > 0.0){
      vec3 cameraSpaceRay = normalize(eyeDir);
      cameraSpaceRay /= cameraSpaceRay.z;
      cameraSpaceRay *= linearizeDepth(depthSample);
      mainDepth = max(0.0, length(cameraSpaceRay));
    }

    float fogAmount = fogAmount * getDistanceFalloff(mainDepth, rayDir, fogStrength);

    ${r(g,n`vec3 emission = texture(emissionTexture, uv).rgb * floatBlendInputScale;
           vec3 emissionDistanceCorrected = mix(emission, vec3(0.0), fogAmount * fogColorDistanceWeight);
           vec3 finalFogColor = fogColor * fogAmount + emissionDistanceCorrected;
           vec4 fog = vec4(finalFogColor, fogAmount);`,n`vec4 fog = vec4(fogColor, 1.0) * fogAmount;`)}
    fragColor = delinearizeGamma(vec4(tonemapACES(fog.rgb), fog.a));
  `),m}var _=Object.freeze(Object.defineProperty({__proto__:null,FogPassParameters:h,build:g},Symbol.toStringTag,{value:`Module`}));export{h as n,_ as r,g as t};