import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  sassOptions: {
    // Silence Sass deprecation warnings emitted by dependencies in node_modules.
    quietDeps: true,
    // Suppress known upstream/toolchain deprecations until Carbon/Next update internals.
    silenceDeprecations: ['mixed-decls', 'legacy-js-api'],
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      ...(config.ignoreWarnings ?? []),
      {
        // Suppress Dart Sass deprecation noise from current Next/Sass integration.
        message: /Deprecation.*legacy JS API is deprecated/i,
      },
      {
        // Suppress upstream Carbon mixed declarations deprecation output.
        message: /Deprecation Warning.*mixed-decls/i,
      },
    ];

    return config;
  },
}

export default nextConfig
