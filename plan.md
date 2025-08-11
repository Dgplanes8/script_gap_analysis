[22:21:51.726] Running build in Washington, D.C., USA (East) – iad1
[22:21:51.726] Build machine configuration: 2 cores, 8 GB
[22:21:51.755] Cloning github.com/Dgplanes8/script_gap_analysis (Branch: enhanced-phased-workflow, Commit: 5e68be1)
[22:21:52.535] Warning: Failed to fetch one or more git submodules
[22:21:52.535] Cloning completed: 780.000ms
[22:21:54.575] Restored build cache from previous deployment (6v3qGeDdRe6oKBvcL8sjDrCzWHy3)
[22:21:59.292] Running "vercel build"
[22:21:59.773] Vercel CLI 44.7.3
[22:22:00.098] Installing dependencies...
[22:22:01.862] 
[22:22:01.862] up to date in 2s
[22:22:01.863] 
[22:22:01.863] 180 packages are looking for funding
[22:22:01.863]   run `npm fund` for details
[22:22:01.892] Detected Next.js version: 14.2.30
[22:22:01.897] Running "npm run build"
[22:22:02.009] 
[22:22:02.009] > apsics-media-landing@1.0.0 build
[22:22:02.010] > next build
[22:22:02.010] 
[22:22:02.742]   ▲ Next.js 14.2.30
[22:22:02.743] 
[22:22:02.815]    Creating an optimized production build ...
[22:22:13.231]  ✓ Compiled successfully
[22:22:13.232]    Linting and checking validity of types ...
[22:22:32.079] Failed to compile.
[22:22:32.080] 
[22:22:32.080] ./app/about/page.tsx:69:17
[22:22:32.080] Type error: Type '(packageId?: string | undefined) => void' is not assignable to type 'MouseEventHandler<HTMLButtonElement>'.
[22:22:32.080]   Types of parameters 'packageId' and 'event' are incompatible.
[22:22:32.080]     Type 'MouseEvent<HTMLButtonElement, MouseEvent>' is not assignable to type 'string'.
[22:22:32.080] 
[22:22:32.080] [0m [90m 67 |[39m               [33m<[39m[33m/[39m[33mp[39m[33m>[39m[0m
[22:22:32.080] [0m [90m 68 |[39m               [33m<[39m[33mbutton[39m[0m
[22:22:32.080] [0m[31m[1m>[22m[39m[90m 69 |[39m                 onClick[33m=[39m{handleOpenConsultation}[0m
[22:22:32.080] [0m [90m    |[39m                 [31m[1m^[22m[39m[0m
[22:22:32.081] [0m [90m 70 |[39m                 className[33m=[39m[32m"bg-white text-orange-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-lg"[39m[0m
[22:22:32.081] [0m [90m 71 |[39m               [33m>[39m[0m
[22:22:32.081] [0m [90m 72 |[39m                 [33mBook[39m [33mGrowth[39m [33mAssessment[39m[0m
[22:22:32.107] Next.js build worker exited with code: 1 and signal: null
[22:22:32.125] Error: Command "npm run build" exited with 1