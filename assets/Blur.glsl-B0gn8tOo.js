import{n as e}from"./glsl-D85RBwKC.js";import{t}from"./Texture2DPassUniform-CiCHIiok.js";import{t as n}from"./ScreenSpacePass.glsl-9L-_X5OK.js";import{t as r}from"./ShaderBuilder-8uuwgR05.js";function i(){let i=new r;return i.include(n),i.fragment.uniforms.add(new t(`blendWeightsTexture`,e=>e.inputTexture),new t(`colorTexture`,e=>e.color)),i.fragment.main.add(e`vec2 resolution = 1.0 / vec2(textureSize(colorTexture, 0));
vec4 offsets = vec4(uv.x + resolution.x, uv.y, uv.x, uv.y - resolution.y);
vec4 a;
a.rb = texture(blendWeightsTexture, uv).rb;
a.g = texture(blendWeightsTexture, offsets.zw).g;
a.a = texture(blendWeightsTexture, offsets.xy).a;
if ( dot(a, vec4(1.0)) < 1e-5 ) {
fragColor = texture( colorTexture, uv, 0.0 );
} else {
vec2 offset;
offset.x = a.a > a.b ? a.a : -a.b;
offset.y = a.g > a.r ? -a.g : a.r;
if ( abs( offset.x ) > abs( offset.y )) {
offset.y = 0.0;
} else {
offset.x = 0.0;
}
vec4 C = texture( colorTexture, uv, 0.0 );
vec4 Cop = texture( colorTexture, uv + sign( offset ) * resolution.xy, 0.0 );
float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );
fragColor = mix(C, Cop, s);
}`),i}var a=Object.freeze(Object.defineProperty({__proto__:null,build:i},Symbol.toStringTag,{value:`Module`}));export{i as n,a as t};