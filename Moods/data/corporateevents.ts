// src/data/corporate-events.ts
export const corporateEvents = {
  // Positive Moods
  productive: [
    { id: 'project-milestone', name: 'Project Milestone Achieved' },
    { id: 'efficient-meeting', name: 'Productive Meeting' },
    { id: 'deadline-met', name: 'Met Important Deadline' },
    { id: 'problem-solved', name: 'Solved Complex Problem' },
    { id: 'team-success', name: 'Team Success' },
    { id: 'process-improvement', name: 'Improved Work Process' }
  ],
  motivated: [
    { id: 'new-project', name: 'Started New Project' },
    { id: 'mentor-session', name: 'Mentoring Session' },
    { id: 'training', name: 'Professional Development' },
    { id: 'goal-progress', name: 'Progress on Goals' },
    { id: 'positive-feedback', name: 'Received Good Feedback' },
    { id: 'team-inspiration', name: 'Inspired by Team' }
  ],
  collaborative: [
    { id: 'successful-meeting', name: 'Successful Team Meeting' },
    { id: 'cross-team', name: 'Cross-team Collaboration' },
    { id: 'knowledge-sharing', name: 'Knowledge Sharing' },
    { id: 'team-building', name: 'Team Building Activity' },
    { id: 'project-sync', name: 'Project Synchronization' },
    { id: 'client-collaboration', name: 'Client Collaboration' }
  ],
  accomplished: [
    { id: 'project-completion', name: 'Project Completion' },
    { id: 'goal-achievement', name: 'Goal Achievement' },
    { id: 'recognition', name: 'Professional Recognition' },
    { id: 'skill-mastery', name: 'Skill Development' },
    { id: 'positive-impact', name: 'Made Positive Impact' },
    { id: 'successful-presentation', name: 'Successful Presentation' }
  ],
  confident: [
    { id: 'leadership-success', name: 'Leadership Success' },
    { id: 'decision-making', name: 'Made Key Decision' },
    { id: 'expertise-shared', name: 'Shared Expertise' },
    { id: 'challenge-handled', name: 'Handled Challenge Well' },
    { id: 'initiative-taken', name: 'Took Initiative' },
    { id: 'skill-validation', name: 'Skills Validated' }
  ],

  // Challenging Moods
  stressed: [
    { id: 'tight-deadline', name: 'Tight Deadline' },
    { id: 'high-workload', name: 'High Workload' },
    { id: 'resource-constraints', name: 'Resource Constraints' },
    { id: 'stakeholder-pressure', name: 'Stakeholder Pressure' },
    { id: 'technical-challenges', name: 'Technical Challenges' },
    { id: 'work-life-balance', name: 'Work-Life Balance' }
  ],
  challenged: [
    { id: 'complex-project', name: 'Complex Project' },
    { id: 'difficult-stakeholder', name: 'Stakeholder Management' },
    { id: 'team-dynamics', name: 'Team Dynamics' },
    { id: 'new-responsibility', name: 'New Responsibility' },
    { id: 'change-management', name: 'Managing Change' },
    { id: 'resource-allocation', name: 'Resource Management' }
  ],
  concerned: [
    { id: 'project-risks', name: 'Project Risks' },
    { id: 'team-performance', name: 'Team Performance' },
    { id: 'market-changes', name: 'Market Changes' },
    { id: 'budget-constraints', name: 'Budget Constraints' },
    { id: 'timeline-pressure', name: 'Timeline Pressure' },
    { id: 'quality-issues', name: 'Quality Issues' }
  ],

  // Neutral Moods
  focused: [
    { id: 'strategic-planning', name: 'Strategic Planning' },
    { id: 'analysis', name: 'Data Analysis' },
    { id: 'documentation', name: 'Documentation Work' },
    { id: 'skill-development', name: 'Skill Development' },
    { id: 'project-planning', name: 'Project Planning' },
    { id: 'problem-analysis', name: 'Problem Analysis' }
  ],
  professional: [
    { id: 'stakeholder-meeting', name: 'Stakeholder Meeting' },
    { id: 'performance-review', name: 'Performance Review' },
    { id: 'client-presentation', name: 'Client Presentation' },
    { id: 'team-management', name: 'Team Management' },
    { id: 'process-review', name: 'Process Review' },
    { id: 'policy-compliance', name: 'Policy Compliance' }
  ],
  balanced: [
    { id: 'workload-management', name: 'Workload Management' },
    { id: 'priority-setting', name: 'Priority Setting' },
    { id: 'time-management', name: 'Time Management' },
    { id: 'delegation', name: 'Task Delegation' },
    { id: 'boundary-setting', name: 'Boundary Setting' },
    { id: 'work-planning', name: 'Work Planning' }
  ],

  // Default events for custom moods
  default: [
    { id: 'project', name: 'Project Related' },
    { id: 'team', name: 'Team Related' },
    { id: 'client', name: 'Client Related' },
    { id: 'leadership', name: 'Leadership Related' },
    { id: 'professional-dev', name: 'Professional Development' },
    { id: 'organizational', name: 'Organizational' },
    { id: 'operational', name: 'Operational' },
    { id: 'strategic', name: 'Strategic' },
    { id: 'administrative', name: 'Administrative' },
    { id: 'external', name: 'External Factors' },
    { id: 'other-work', name: 'Other Work Related' }
  ]
};