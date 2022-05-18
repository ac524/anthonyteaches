# Git Workflow

This document outlines the recommended workflow for working through a task in the Anthony Teaches project.

## Workflow Steps

1. **[Pick a Task](#pick-a-task)** - Assign yourself to the issue you wish to work on.
2. **[Create/Checkout a Branch](#createcheckout-a-branch)** - Create a new branch off `main` or checkout out the existing branch if jumping in on existing work.
3. **[Open or Review Draft PR](#open-or-review-draft-pr)** - Create a draft PR outlining the goals of the branch if starting new work, or review the goals set out by the creator before starting work.
4. **[Working on Your Branch](#working-on-your-branch)** Work on completing outlined tasks. Commit and push frequently as you work.
5. Convert the draft PR to an open PR, signaling it's ready for review. Indicate what you intended to accomplish with this PR so the reviewer can pull down your branch and know what to watch for without having to review all the code.
6. **[Request Reviews](#request-reviews)** (Optional) Request reviewers for your PR.
7. **[Update your Branch](#update-your-branch)**Complete/Respond to any edits/feedback provided by reviewers
8. Accept and Merge your PR
9. (Pending completion CD Pipeline) Track and confirm deployment
10. **[Housekeeping](#housekeeping)**Cleanup (delete) the development branch (from github and local)
11. Start back at Step 1!

### Pick a Task

Detail process / Provide images and code for demonstration

### Create/Checkout a Branch

Detail process / Provide images and code for demonstration
Choose a name that is fairly specific to your issue. Avoid names such as 'Anthony's Branch'. You can add a flag in the front to help specify your issue, such as 'bug/login-issue'. Generally branch names use kebab-case, all lowercase with a - and a '/' for the initial flag, as in the example above.
Don't forget to update the project or kanban board with the status of the issue (i.e. in-progress)

### Open or Review Draft PR

Detail process / Provide images and code for demonstration
This helps other collaborators know that the issue is in progress and they are able to see what you plan to implement in your branch so tasks are not duplicated. Bonus: you can also embed a brief loom video of you explaining your code or issue or walking through the development process.

Pro-tip:Include the '#' with the issue number in your main issue comment. (i.e Resolves #52). This automatically will close your issue when the pull request is merged!

### Working on Your Branch

Keep your branch within the scope of the outlined tasks. If you try to take on too many things it can interfere with issues/other branches already in progress. You can always add a new issue and separate branch if you'd like to do discover additional tasks related to your current issue.
<br>
If you cannot complete your issue, you can flag your draft PR with a 'help wanted' label inside GitHub. <br>
Embed brief video or include screenshots/code detailing out where you are stuck/highlighting the problem to help other developers help you better. You can tag other github collaborators inside of the initial comment by including an _@username_ inside the comment. (Provides the user with a notification inside Github, including the link to the draftPR)

### Request Reviews

Requesting a review from one (or many) fellow collaborator(s) helps the whole team. The reviewers responsibility is to pull your branch down from github, run the code, and review the process you've detailed out. They'll need to make sure the code functions as expected and is inline with project goals and best practices. Providing the reviewer with a concise outline of what the code should do is very important in the review process. Remember to update your project/kanban board with the status (i.e. pull request in review)

### Update your Branch

Review the edits/feedback to your branch and try to make the updates as quickly as possible to keep the project moving forward. You can respond to the feedback with clarifying questions or status updates directly within github. Make sure to re-request review after you've made changes, as the reviewer will likely want to run/test your branch before approving the PR/merge.

### Housekeeping

It seems tedious and unimportant, but it only takes a minute! Please help other collaborators keep a tidy workspace by deleting your branch on github and locally after deployment. Deleted branches can be restored, if need be, but keeping unused branches makes things cluttered for the team. When looking at branches and pulling them down, it's important we are all working with the most up to date list. Having 30 stale branches sitting in the list of branches makes it confusing for new and existing collaborators to work with.

Lastly: Ensure your project/kanban board is up to date regarding your issue status. Start over at Step 1 with a new issue/branch if you didn't accomplish all the items included in your original issue!
