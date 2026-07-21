import{t as e}from"./NoParameters-XZJ-8n06.js";import{n as t,t as n}from"./glsl-D85RBwKC.js";import{t as r}from"./ReadDepth.glsl-Ca_0z8Pl.js";import{t as i}from"./Texture2DPassUniform-CiCHIiok.js";import{t as a}from"./ScreenSpacePass.glsl-9L-_X5OK.js";import{t as o}from"./ShaderBuilder-8uuwgR05.js";var s=class extends e{};function c(e){let{preparePass:s}=e,c=new o;return c.include(a),c.fragment.include(r),c.fragment.uniforms.add(new i(`cutFillReferenceDepthTexture`,e=>e.referenceDepthTexture),new i(`cutFillTargetDepthTexture`,e=>e.targetDepthTexture)),c.fragment.code.add(t`bool outsideFar(float depth) {
return depth >= 1.0;
}`),c.fragment.main.add(t`
    float referenceDepth = depthFromTexture(cutFillReferenceDepthTexture, uv);
    float targetDepth = depthFromTexture(cutFillTargetDepthTexture, uv);

    if (outsideFar(targetDepth)) {
      discard;
    }

    ${n(s===0,`
        float depth = referenceDepth - targetDepth;
        fragColor = vec4(min(0.0, depth), max(0.0, depth), 0.0, 0.0);
    `)}

    ${n(s===1,`
        ivec2 texSize = textureSize(cutFillReferenceDepthTexture, 0);
        ivec2 coords = ivec2(gl_FragCoord.xy);
        float packedCoords = float(coords.x) + float(coords.y) * float(texSize.x);

        fragColor = vec4(referenceDepth, packedCoords, 0.0, 0.0);
    `)}
  `),c}var l=Object.freeze(Object.defineProperty({__proto__:null,CutFillDepthParameters:s,build:c},Symbol.toStringTag,{value:`Module`}));export{l as n,s as r,c as t};