/**
 * BuildInfo - Version marker component
 * Displays the git commit hash and build time in the page footer.
 * This helps verify which build version is running on production.
 */
export default function BuildInfo() {
  const commit = process.env.NEXT_PUBLIC_BUILD_COMMIT || 'dev';
  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME || '';

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <p className="text-xs text-gray-400 text-center">
        Build {commit}
        {buildTime && ` · ${new Date(buildTime).toLocaleDateString()}`}
      </p>
    </div>
  );
}
