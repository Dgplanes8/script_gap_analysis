# Review Notes - Landing Page & Workflow Systems

## Landing Page
- `AlyticsLanding` orchestrates hero → workflow → benefits → proof → pricing → conversion. CTAs should consistently trigger `FreeWeekProvider` modal via `useFreeWeek`.
- Sections using `framer-motion` currently import `motion` in parent even when unused; clean up when touching file.

## Workflow Orchestrators
- Both `ad_workflow_orchestrator.py` & `phased_workflow_orchestrator.py` rely on absolute path `/Users/nataliebasque/Ad Workflow`. Plan to replace with project root detection (`Path(__file__).resolve().parent`).
- Invalid step handling in `PhasedWorkflowOrchestrator.execute_step` needs fix; `self.get_step_method("")` returns `None` leading to AttributeError.
- Reddit research scripts (`workflow_steps/reddit_api_research*.py`) have hard-coded beauty subreddit/queries; refactor to derive from brand profile & config.

Keep these handy when implementing fixes or enhancements.
