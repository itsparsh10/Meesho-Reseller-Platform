import React, { useState } from "react";
import axios from "axios";
import "./ai.css";

const AI = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const GEMINI_API_KEY = "AIzaSyBxtD1J5EfzH41ZWzIjkKcAt8rjwOfcZmM";
  const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

  // Marketing-related keywords
  const marketingKeywords = [
    "gst",
    "tax",
    "taxation",
    "how can I use social media to increase sales?",
    "how to use social media for increase sales?",
    "how to market the product?",
    "how to increase sales?",
    "how to increase sales online?",
    "how to increase sales on website?",
    "Market",
    "Reselling",
    "Affiliate",
    "Branding",
    "Sales Funnel",
    "Conversion",
    "Lead Generation",
    "Customer Retention",
    "E-commerce",
    "Dropshipping",
    "Social Media",
    "Advertising",
    "Target Audience",
    "Market Research",
    "Content Strategy",
    "SEO",
    "PPC",
    "Email Marketing",
    "Analytics",
    "Customer Acquisition",
    "Influencer Marketing",
    "Remarketing",
    "Customer Loyalty",
    "Networking",
    "B2B",
    "B2C",
    "Partnerships",
    "Referral Programs",
    "Upselling",
    "Cross-selling",
    "Promotions",
    "Discount Strategies",
    "Freemium Model",
    "Brand Awareness",
    "Brand Equity",
    "Customer Segmentation",
    "Churn Rate",
    "Customer Lifetime Value",
    "Key Performance Indicators (KPIs)",
    "Metrics",
    "Buyer Persona",
    "Engagement",
    "Outreach",
    "Market Positioning",
    "Unique Selling Proposition (USP)",
    "Value Proposition",
    "Competitive Analysis",
    "Digital Marketing",
    "Traditional Marketing",
    "Growth Hacking",
    "Landing Pages",
    "A/B Testing",
    "Click-Through Rate (CTR)",
    "Return on Investment (ROI)",
    "Search Engine Marketing (SEM)",
    "Keyword Research",
    "Customer Feedback",
    "User Experience (UX)",
    "Website Optimization",
    "Sales Pipeline",
    "Product Launch",
    "Product-Market Fit",
    "Pricing Strategy",
    "Customer Support",
    "Virtual Assistants",
    "Community Building",
    "Content Marketing",
    "Blogging",
    "Video Marketing",
    "Webinars",
    "Podcasting",
    "Storytelling",
    "Public Relations (PR)",
    "Brand Advocates",
    "Networking Events",
    "Trade Shows",
    "Affiliate Programs",
    "Revenue Streams",
    "Channel Partnerships",
    "Omni-channel Marketing",
    "Direct Marketing",
    "Event Marketing",
    "Experiential Marketing",
    "Customer Journey",
    "Touchpoints",
    "Engagement Rate",
    "Mobile Marketing",
    "App Optimization",
    "Push Notifications",
    "SMS Marketing",
    "Geo-targeting",
    "Hyper-local Marketing",
    "Niche Marketing",
    "Personalization",
    "Dynamic Content",
    "Interactive Content",
    "Viral Marketing",
    "Referral Traffic",
    "Organic Traffic",
    "Paid Traffic",
    "Cold Calling",
    "Cold Emailing",
    "Lead Nurturing",
    "Account-Based Marketing (ABM)",
    "Sponsorships",
    "Performance Marketing",
    "Pay-per-sale",
    "Pay-per-lead",
    "Pay-per-click",
    "Content Distribution",
    "Syndication",
    "Press Releases",
    "Customer Advocacy",
    "Brand Story",
    "Corporate Social Responsibility (CSR)",
    "Cause Marketing",
    "Influence",
    "Trust Building",
    "Emotional Marketing",
    "Scarcity Marketing",
    "Urgency Tactics",
    "Flash Sales",
    "Seasonal Marketing",
    "Holiday Campaigns",
    "Event-based Campaigns",
    "Marketing Automation",
    "CRM Tools",
    "Email Sequences",
    "Drip Campaigns",
    "Audience Insights",
    "Behavioral Targeting",
    "Predictive Analytics",
    "Customer Data Platforms (CDP)",
    "Privacy Compliance",
    "GDPR",
    "CCPA",
    "Personal Data",
    "Third-party Cookies",
    "First-party Data",
    "Zero-party Data",
    "Social Proof",
    "Reviews",
    "Testimonials",
    "Case Studies",
    "White Papers",
    "Ebooks",
    "Industry Reports",
    "Thought Leadership",
    "Networking Platforms",
    "LinkedIn",
    "Facebook",
    "Instagram",
    "Twitter",
    "Pinterest",
    "TikTok",
    "YouTube",
    "Snapchat",
    "Reddit",
    "Quora",
    "Community Forums",
    "Social Listening",
    "Sentiment Analysis",
    "Real-time Marketing",
    "Event Sponsorship",
    "Swag",
    "Branded Merchandise",
    "Print Marketing",
    "Flyers",
    "Brochures",
    "Billboards",
    "Direct Mail",
    "Catalogs",
    "TV Advertising",
    "Radio Advertising",
    "Media Buying",
    "Programmatic Advertising",
    "Ad Exchange",
    "Demand-side Platform (DSP)",
    "Supply-side Platform (SSP)",
    "Ad Placement",
    "Ad Impressions",
    "Cost Per Mille (CPM)",
    "Cost Per Action (CPA)",
    "Lead Scoring",
    "Customer Reviews",
    "Surveys",
    "Net Promoter Score (NPS)",
    "Customer Satisfaction",
    "Voice of the Customer (VoC)",
    "Client Onboarding",
    "Account Management",
    "Project Management",
    "Agile Marketing",
    "Scrum Framework",
    "Kanban Boards",
    "Marketing Plans",
    "Marketing Budgets",
    "Market Trends",
    "Competitive Landscape",
    "Industry Insights",
    "Innovative Strategies",
    "Future-proofing",
    "Technological Adoption",
    "Augmented Reality (AR)",
    "Virtual Reality (VR)",
    "Metaverse Marketing",
    "Blockchain in Marketing",
    "NFT Campaigns",
    "AI-powered Tools",
    "Chatbots",
    "Conversational Marketing",
    "Voice Search Optimization",
    "Alexa Skills",
    "Google Assistant Actions",
    "Subscription Models",
    "Membership Programs",
    "Loyalty Cards",
    "Customer Appreciation",
    "Thank-you Emails",
    "Follow-up Tactics",
    "Reputation Management",
    "Crisis Communication",
    "Damage Control",
    "Social Responsibility",
    "Ethical Marketing",
    "Sustainability",
    "Green Marketing",
    "Eco-friendly Products",
    "Cause-driven Campaigns",
    "Inclusive Marketing",
    "Diversity Initiatives",
    "Authenticity",
    "Transparency",
    "Brand Trust",
    "Customer Empathy",
    "Human-centered Design",
    "Emotional Intelligence",
    "Cultural Relevance",
    "Localization",
    "Global Marketing",
    "Expansion Strategies",
    "Franchising",
    "Joint Ventures",
    "Business Scaling",
    "Risk Management",
    "Cohort Analysis",
    "Data-driven Decisions",
    "Big Data",
    "Cloud Marketing",
    "Integration Platforms",
    "API",
    "Marketing Dashboards",
    "ROI Reporting",
    "Campaign Tracking",
    "Split Testing",
    "Heatmaps",
    "Click Maps",
    "Session Replay",
    "Customer Behavior",
    "Purchase Patterns",
    "Trend Analysis",
    "Forecasting",
    "Sales Enablement",
    "Training",
    "Knowledge Sharing",
    "Collaboration Tools",
    "Internal Communication",
    "Slack",
    "Trello",
    "Asana",
    "Zoom",
    "Web Conferencing",
    "Workshops",
    "Masterclasses",
    "Certifications",
    "Skill Development",
    "Mentorship Programs",
    "Team Building",
    "Employee Advocacy",
    "Internal Branding",
    "Corporate Identity",
    "Vision Statement",
    "Mission Statement",
    "Core Values",
    "Brand Personality",
    "Tone of Voice",
    "Visual Identity",
    "Logo Design",
    "Typography",
    "Color Palette",
    "Imagery",
    "Graphics",
    "Animations",
    "Templates",
    "Style Guides",
    "Documentation",
    "Playbooks",
    "Operational Efficiency",
    "Budget Allocation",
    "Resource Management",
    "Workflow Automation",
    "Task Prioritization",
    "Customer-centricity",
    "Product Focus",
    "Service Excellence",
  ];

  // Function to validate if query contains marketing-related terms
  const isMarketingRelated = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return marketingKeywords.some((keyword) =>
      lowercaseQuery.includes(keyword.toLowerCase())
    );
  };

  const formatAIResponse = (rawResponse) => {
    try {
      const responseText = rawResponse.data.candidates[0].content.parts[0].text;
      
      if (!responseText) {
        throw new Error('Empty response received');
      }

      // Split the text into sections using regex
      const sections = responseText.split(/(?=\d+\.|•|\*)/g).filter(text => text.trim());

      const formatSection = (text) => {
        return text
          .replace(/^\d+\.\s*|\•\s*|\*\s*/, '')
          .trim();
      };

      return {
        summary: {
          title: "Executive Summary",
          content: formatSection(sections[0] || ''),
          icon: "📋"
        },
        strategy: {
          title: "Strategy & Implementation",
          points: sections.slice(1, 4).map(point => ({
            content: formatSection(point),
            status: "Active"
          })),
          icon: "🎯"
        },
        recommendations: {
          title: "Key Recommendations",
          points: sections.slice(4, 7).map(point => ({
            content: formatSection(point),
            priority: "High"
          })),
          icon: "💡"
        },
        metrics: {
          title: "Key Performance Indicators",
          items: [
            {
              label: "Impact Potential",
              value: "High",
              trend: "↑"
            },
            {
              label: "Implementation",
              value: "Medium",
              trend: "→"
            },
            {
              label: "ROI Expected",
              value: "High",
              trend: "↑"
            },
            {
              label: "Time Frame",
              value: "Short-term",
              trend: "→"
            }
          ],
          icon: "📊"
        },
        nextSteps: {
          title: "Action Plan",
          points: sections.slice(7).map((point, index) => ({
            step: index + 1,
            content: formatSection(point),
            status: "Pending"
          })).slice(0, 3),
          icon: "👉"
        }
      };
    } catch (error) {
      console.error('Error formatting response:', error);
      throw new Error('Failed to process response');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSearchResults(null);

    if (!isMarketingRelated(query)) {
      setError("Please ask questions related to marketing, sales, or business growth strategies.");
      setLoading(false);
      return;
    }

    try {
      const enhancedQuery = `
        Provide a detailed analysis for ${query} with the following structure:
        1. Brief executive summary (2-3 sentences)
        2. Three key strategic points
        3. Three specific recommendations
        4. Three actionable next steps

        Please format each point clearly and concisely.
      `;

      const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        contents: [{
          parts: [{
            text: enhancedQuery
          }]
        }]
      });

      const formattedResponse = formatAIResponse(response);
      setSearchResults(formattedResponse);
    } catch (error) {
      console.error("API Error:", error);
      setError("Unable to process your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to suggest marketing keywords based on current input
  const getSuggestions = (input) => {
    if (!input) return [];
    const lowercaseInput = input.toLowerCase();
    return marketingKeywords
      .filter((keyword) => keyword.toLowerCase().includes(lowercaseInput))
      .slice(0, 5); // Show max 5 suggestions
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <img
            src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
            alt="Logo"
          />
        </div>
        <nav className="sidebar-menu">
          <a href="/dashboardhome" className="menu-item">
            Home
          </a>
          <a href="/order" className="menu-item">
            Orders
          </a>
          <a href="/return" className="menu-item">
            Returns
          </a>
          <a href="/inventory" className="menu-item">
            Inventory
          </a>
          <a href="/payment" className="menu-item">
            Payments
          </a>
          <a href="/ai" className="menu-item active">
            AI Assistant
          </a>
          <a href="/learn" className="menu-item">
            Learn
          </a>
          <br />
          <br />
          <br />
          <br />
          <br />
          <a href="/myprofile" className="menu-item">
            MyProfile
          </a>
          <a href="#" className="menu-item">
            Support
          </a>
        </nav>
      </div>

      <div className="main-content">
        <div className="ai-container">
          <div className="ai-header">
            <h1>AI Marketing Assistant</h1>
            <p>
              Get personalized marketing strategies and insights for your
              business
            </p>
          </div>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-box">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask about marketing strategies, analytics, or growth tips..."
                  className="search-input"
                />
              </div>
              <button
                type="submit"
                className="search-button"
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Get Insights"}
              </button>
            </div>
          </form>

          {error && <div className="error-message">{error}</div>}

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Analyzing your query...</p>
            </div>
          )}

          {searchResults && !loading && (
            <div className="results-container">
              {/* Summary Section */}
              <div className="summary-section">
                <div className="section-header">
                  <span className="section-icon">{searchResults.summary.icon}</span>
                  <h2>{searchResults.summary.title}</h2>
                </div>
                <div className="summary-content">
                  {searchResults.summary.content}
                </div>
              </div>

              {/* Strategy Section */}
              <div className="strategy-section">
                <div className="section-header">
                  <span className="section-icon">{searchResults.strategy.icon}</span>
                  <h2>{searchResults.strategy.title}</h2>
                </div>
                <div className="strategy-list">
                  {searchResults.strategy.points.map((point, index) => (
                    <div key={index} className="strategy-item">
                      <div className="point-number">{index + 1}</div>
                      <div className="point-content">
                        <p>{point.content}</p>
                        <span className="status-badge">{point.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Section */}
              <div className="metrics-section">
                <div className="section-header">
                  <span className="section-icon">{searchResults.metrics.icon}</span>
                  <h2>{searchResults.metrics.title}</h2>
                </div>
                <div className="metrics-grid">
                  {searchResults.metrics.items.map((metric, index) => (
                    <div key={index} className="metric-card">
                      <div className="metric-trend">{metric.trend}</div>
                      <div className="metric-value">{metric.value}</div>
                      <div className="metric-label">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations Section */}
              <div className="recommendations-section">
                <div className="section-header">
                  <span className="section-icon">{searchResults.recommendations.icon}</span>
                  <h2>{searchResults.recommendations.title}</h2>
                </div>
                <div className="recommendations-list">
                  {searchResults.recommendations.points.map((point, index) => (
                    <div key={index} className="recommendation-item">
                      <div className="point-content">
                        <p>{point.content}</p>
                        <span className="priority-badge">Priority: {point.priority}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps Section */}
              <div className="next-steps-section">
                <div className="section-header">
                  <span className="section-icon">{searchResults.nextSteps.icon}</span>
                  <h2>{searchResults.nextSteps.title}</h2>
                </div>
                <div className="steps-list">
                  {searchResults.nextSteps.points.map((step, index) => (
                    <div key={index} className="step-item">
                      <div className="step-number">Step {step.step}</div>
                      <div className="step-content">
                        <p>{step.content}</p>
                        <span className="status-badge">{step.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AI;
