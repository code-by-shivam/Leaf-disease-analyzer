import { Loader2, ScanSearch } from "lucide-react";

import { Button } from "@/components/ui/button";

function AnalyzeButton({ onClick, loading = false }) {
  return (
    <Button
      type="button"
      size="lg"
      onClick={onClick}
      disabled={loading}
      className="w-full sm:w-auto"
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Analyzing Image...
        </>
      ) : (
        <>
          <ScanSearch className="size-4" />
          Analyze Image
        </>
      )}
    </Button>
  );
}

export default AnalyzeButton;
