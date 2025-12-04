"""
Data Visualization Script for Mocksy User Study
N=10 participants - Designed for small sample sizes
"""

import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
from pathlib import Path

# Set style for professional academic figures
plt.style.use('seaborn-v0_8-paper')
sns.set_palette("colorblind")
plt.rcParams['font.family'] = 'serif'
plt.rcParams['font.size'] = 10
plt.rcParams['figure.dpi'] = 300

# Create output directory
output_dir = Path('docs/figures')
output_dir.mkdir(parents=True, exist_ok=True)

# ============================================================================
# CHART 1: Learning Gains by Experience Level (Before/After STAR Understanding)
# ============================================================================
print("Generating Chart 1: Learning Gains by Experience Level...")

fig, ax = plt.subplots(figsize=(8, 5))

# Data from Table 2 in simulated_study_data.md
categories = ['Novice\n(0-3 interviews)\nn=4', 
              'Intermediate\n(4-10 interviews)\nn=4', 
              'Expert\n(10+ interviews)\nn=2']
pre_means = [1.5, 3.0, 5.0]
post_means = [4.5, 4.0, 5.0]
gains = [3.0, 1.0, 0.0]

x = np.arange(len(categories))
width = 0.35

# Create grouped bars
bars1 = ax.bar(x - width/2, pre_means, width, label='Before Using Mocksy', 
               color='#E74C3C', alpha=0.8, edgecolor='black', linewidth=0.5)
bars2 = ax.bar(x + width/2, post_means, width, label='After Using Mocksy', 
               color='#27AE60', alpha=0.8, edgecolor='black', linewidth=0.5)

# Add gain annotations
for i, gain in enumerate(gains):
    if gain > 0:
        ax.annotate(f'+{gain:.1f}', 
                   xy=(x[i], max(pre_means[i], post_means[i]) + 0.2),
                   ha='center', fontsize=11, fontweight='bold', color='#2C3E50')

# Styling
ax.set_ylabel('STAR Framework Understanding\n(1=Don\'t understand, 5=Fully understand)', 
              fontsize=11, fontweight='bold')
ax.set_xlabel('Participant Experience Level', fontsize=11, fontweight='bold')
ax.set_title('Learning Impact: STAR Understanding by Experience Level\n(N=10)', 
             fontsize=13, fontweight='bold', pad=15)
ax.set_xticks(x)
ax.set_xticklabels(categories, fontsize=9)
ax.set_ylim(0, 5.5)
ax.legend(loc='upper left', frameon=True, shadow=True)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.axhline(y=3, color='gray', linestyle=':', linewidth=1, alpha=0.5)
ax.text(2.5, 3.1, 'Neutral Understanding', fontsize=8, color='gray', style='italic')

plt.tight_layout()
plt.savefig(output_dir / 'chart1_learning_gains.png', dpi=300, bbox_inches='tight')
print(f"✓ Saved: {output_dir / 'chart1_learning_gains.png'}")
plt.close()

# ============================================================================
# CHART 2: Trust Gap - Trust Score by Interruption Frequency
# ============================================================================
print("Generating Chart 2: Trust Gap Analysis...")

fig, ax = plt.subplots(figsize=(8, 5))

# Data from Analysis Section in simulated_study_data.md
interruption_levels = ['Never\n(n=2)', 'Rarely\n(1 time)\n(n=4)', 
                       'Sometimes\n(2-3 times)\n(n=3)', 'Often\n(4+ times)\n(n=1)']
trust_means = [5.0, 4.0, 2.7, 3.0]
trust_stds = [0.0, 0.0, 0.6, np.nan]  # SD from table

# Color code by trust level
colors = ['#27AE60', '#52BE80', '#E67E22', '#E74C3C']

bars = ax.bar(interruption_levels, trust_means, color=colors, 
              alpha=0.85, edgecolor='black', linewidth=1)

# Add error bars where we have SD
for i, (mean, std) in enumerate(zip(trust_means, trust_stds)):
    if not np.isnan(std) and std > 0:
        ax.errorbar(i, mean, yerr=std, fmt='none', ecolor='black', 
                   capsize=5, capthick=2, linewidth=2)

# Add value labels on bars
for i, (bar, val) in enumerate(zip(bars, trust_means)):
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height + 0.15,
            f'{val:.1f}', ha='center', va='bottom', fontsize=11, fontweight='bold')

# Add trust gap annotation
ax.annotate('', xy=(0, 5.3), xytext=(2, 2.5),
            arrowprops=dict(arrowstyle='<->', color='red', lw=2))
ax.text(1, 4.0, 'Trust Gap\n-1.7 points', ha='center', fontsize=10, 
        fontweight='bold', color='red',
        bbox=dict(boxstyle='round,pad=0.5', facecolor='yellow', alpha=0.3))

# Styling
ax.set_ylabel('Trust in AI Evaluation\n(1=Don\'t trust, 5=Completely trust)', 
              fontsize=11, fontweight='bold')
ax.set_xlabel('Interruption Frequency During Interview', fontsize=11, fontweight='bold')
ax.set_title('The Trust Gap: How Voice Interruptions Degrade User Trust\n(N=10)', 
             fontsize=13, fontweight='bold', pad=15)
ax.set_ylim(0, 5.8)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.axhline(y=3, color='gray', linestyle=':', linewidth=1, alpha=0.5)
ax.text(3.5, 3.1, 'Neutral Trust', fontsize=8, color='gray', style='italic')

plt.tight_layout()
plt.savefig(output_dir / 'chart2_trust_gap.png', dpi=300, bbox_inches='tight')
print(f"✓ Saved: {output_dir / 'chart2_trust_gap.png'}")
plt.close()

# ============================================================================
# CHART 3: Feature Usefulness Distribution (Q13)
# ============================================================================
print("Generating Chart 3: Feature Usefulness...")

fig, ax = plt.subplots(figsize=(8, 5))

# Data from Table 1A (Q13 column)
features = ['STAR Breakdown', 'Improvement Plan', 'Company-Specific\nFeedback', 
            'Answer Comparison']
counts = [5, 3, 2, 1]
percentages = [50, 30, 20, 10]

# Horizontal bar chart (better for small counts)
colors_feat = ['#3498DB', '#9B59B6', '#E67E22', '#E67E22']
bars = ax.barh(features, counts, color=colors_feat, alpha=0.85, 
               edgecolor='black', linewidth=1)

# Add count and percentage labels
for i, (bar, count, pct) in enumerate(zip(bars, counts, percentages)):
    width = bar.get_width()
    if count > 0:
        ax.text(width + 0.1, bar.get_y() + bar.get_height()/2,
                f'n={count} ({pct}%)', va='center', fontsize=10, fontweight='bold')

# Styling
ax.set_xlabel('Number of Participants (N=10)', fontsize=11, fontweight='bold')
ax.set_title('Most Valuable Feedback Feature (Q13: "Select only ONE")\n(N=10)', 
             fontsize=13, fontweight='bold', pad=15)
ax.set_xlim(0, 6)
ax.set_xticks(range(0, 7))
ax.grid(axis='x', alpha=0.3, linestyle='--')
ax.invert_yaxis()  # Highest at top

# Add highlight box for top feature
ax.add_patch(plt.Rectangle((-0.1, 0-0.4), 5.3, 0.8, 
                           fill=False, edgecolor='green', linewidth=2, linestyle='--'))

plt.tight_layout()
plt.savefig(output_dir / 'chart3_feature_usefulness.png', dpi=300, bbox_inches='tight')
print(f"✓ Saved: {output_dir / 'chart3_feature_usefulness.png'}")
plt.close()

# ============================================================================
# CHART 4: SUS Score Distribution (Show Individual Points)
# ============================================================================
print("Generating Chart 4: SUS Score Distribution...")

fig, ax = plt.subplots(figsize=(8, 5))

# Data from Table 1A (SUS Score column)
participants = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10']
sus_scores = [85.0, 67.5, 75.0, 90.0, 70.0, 55.0, 77.5, 85.0, 62.5, 80.0]
mean_sus = 74.8

# Strip plot with box plot (shows all individual points)
# First, create box plot
bp = ax.boxplot([sus_scores], vert=False, widths=0.5, patch_artist=True,
                boxprops=dict(facecolor='lightblue', alpha=0.6),
                medianprops=dict(color='red', linewidth=2),
                whiskerprops=dict(linewidth=1.5),
                capprops=dict(linewidth=1.5))

# Overlay individual points with jitter
y_jitter = np.random.normal(1, 0.04, size=len(sus_scores))
scatter = ax.scatter(sus_scores, y_jitter, s=100, alpha=0.7, 
                    edgecolors='black', linewidth=1.5,
                    c=sus_scores, cmap='RdYlGn', vmin=0, vmax=100)

# Add participant labels
for i, (score, y, label) in enumerate(zip(sus_scores, y_jitter, participants)):
    ax.annotate(label, (score, y), xytext=(0, 8), textcoords='offset points',
               ha='center', fontsize=8, fontweight='bold')

# Add reference line for Mocksy mean
ax.axvline(x=mean_sus, color='green', linestyle='-', linewidth=2, alpha=0.7, label=f'Mocksy Mean ({mean_sus})')

# Add SUS interpretation zones
ax.axvspan(0, 50, alpha=0.1, color='red', label='Poor')
ax.axvspan(50, 70, alpha=0.1, color='orange')
ax.axvspan(70, 85, alpha=0.1, color='yellow')
ax.axvspan(85, 100, alpha=0.1, color='green')

ax.text(25, 1.4, 'Poor', ha='center', fontsize=9, style='italic', color='red')
ax.text(60, 1.4, 'OK', ha='center', fontsize=9, style='italic', color='orange')
ax.text(77.5, 1.4, 'Good', ha='center', fontsize=9, style='italic', color='green')
ax.text(92.5, 1.4, 'Excellent', ha='center', fontsize=9, style='italic', color='darkgreen')

# Styling
ax.set_xlabel('SUS Score (0-100)', fontsize=11, fontweight='bold')
ax.set_title('System Usability Scale (SUS) Distribution\n(N=10, Mean=74.8, SD=9.8)', 
             fontsize=13, fontweight='bold', pad=15)
ax.set_xlim(0, 100)
ax.set_ylim(0.5, 1.5)
ax.set_yticks([])
ax.legend(loc='upper left', frameon=True, shadow=True, fontsize=9)
ax.grid(axis='x', alpha=0.3, linestyle='--')

plt.tight_layout()
plt.savefig(output_dir / 'chart4_sus_distribution.png', dpi=300, bbox_inches='tight')
print(f"✓ Saved: {output_dir / 'chart4_sus_distribution.png'}")
plt.close()

# ============================================================================
# Summary
# ============================================================================
print("\n" + "="*60)
print("✓ ALL VISUALIZATIONS GENERATED SUCCESSFULLY!")
print("="*60)
print(f"\nOutput Directory: {output_dir.absolute()}")
print("\nGenerated Files:")
print("  1. chart1_learning_gains.png       - Learning impact by experience")
print("  2. chart2_trust_gap.png            - Trust vs interruption correlation")
print("  3. chart3_feature_usefulness.png   - Most valuable features")
print("  4. chart4_sus_distribution.png     - SUS score distribution")
print("\n💡 Next Steps:")
print("  - Add these charts to docs/FINAL_REPORT.md (Section 5: Results)")
print("  - Include in presentation slides 5-6")
print("  - Reference in discussion section")
print("\n" + "="*60)

