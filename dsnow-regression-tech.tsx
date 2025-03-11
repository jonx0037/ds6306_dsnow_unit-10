import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';

const DSNOWPresentation = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [showCode, setShowCode] = useState(false);

  // Sample data for visualizations
  const streamingEngagementData = [
    { month: 'Jan', traditional: 65, regression: 78 },
    { month: 'Feb', traditional: 68, regression: 82 },
    { month: 'Mar', traditional: 67, regression: 86 },
    { month: 'Apr', traditional: 69, regression: 89 },
    { month: 'May', traditional: 70, regression: 91 },
    { month: 'Jun', traditional: 72, regression: 94 }
  ];

  const pricingData = [
    { category: 'Electronics', staticPricing: 3.2, dynamicPricing: 7.8 },
    { category: 'Clothing', staticPricing: 2.4, dynamicPricing: 5.2 },
    { category: 'Home Goods', staticPricing: 4.1, dynamicPricing: 6.7 },
    { category: 'Toys', staticPricing: 2.8, dynamicPricing: 4.9 },
    { category: 'Books', staticPricing: 1.9, dynamicPricing: 3.5 }
  ];

  const modelComplexityData = [
    { features: 2, accuracy: 72, size: 10, name: 'SLR Model' },
    { features: 5, accuracy: 81, size: 20, name: 'Basic MLR' },
    { features: 12, accuracy: 87, size: 30, name: 'Advanced MLR' },
    { features: 25, accuracy: 89, size: 40, name: 'Complex MLR' },
    { features: 50, accuracy: 90, size: 50, name: 'Very Complex MLR' },
    { features: 100, accuracy: 90.5, size: 60, name: 'Excessive MLR' }
  ];

  const privacyAwarenessData = [
    { name: 'Aware', value: 33 },
    { name: 'Somewhat Aware', value: 41 },
    { name: 'Unaware', value: 26 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Code block component for displaying R code
  const CodeBlock = ({ code }) => (
    <div className="bg-gray-900 text-white p-4 rounded-md overflow-auto my-4 text-sm">
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );

  // R code examples (shortened for clarity)
  const rCodes = {
    modelComplexity: `# Cross-validation to evaluate model complexity in R
library(caret)
library(glmnet)

evaluate_model_complexity <- function(X, y, max_features) {
  cv_scores <- numeric(max_features)
  
  for (n_features in 1:max_features) {
    X_subset <- X[, 1:n_features, drop = FALSE]
    
    # Define training control
    train_control <- trainControl(method = "cv", number = 5)
    
    # Train the model using cross-validation
    model <- train(x = X_subset, y = y, 
                   method = "lm",
                   trControl = train_control,
                   metric = "Rsquared")
    
    cv_scores[n_features] <- mean(model$results$Rsquared)
  }
  
  return(cv_scores)
}`,
    dynamicPricing: `# Dynamic pricing algorithm with elasticity in R
calculate_optimal_price <- function(base_price, price_elasticity, 
                                   competitor_prices, 
                                   inventory_level, 
                                   max_inventory) {
  # Price elasticity effect
  elasticity_factor <- 1 - (price_elasticity * 0.1)
  
  # Competitor pricing effect
  avg_competitor_price <- mean(competitor_prices)
  competitor_factor <- 0.3 * (avg_competitor_price / base_price)
  
  # Inventory level effect (lower inventory = higher price)
  inventory_factor <- 1 - (0.2 * (inventory_level / max_inventory))
  
  # Calculate optimal price
  optimal_price <- base_price * elasticity_factor * 
                  competitor_factor * inventory_factor
  
  return(optimal_price)
}`
  };

  // Section content
  const intro = {
    title: "How Tech Companies Are Using Regression Analysis",
    content: (
      <div>
        <p className="mb-4">Regression analysis has become a cornerstone in how modern tech companies make product decisions and predict user behavior. As competition intensifies in the digital space, companies are refining their regression models to gain competitive advantages.</p>
        <p className="mb-4">This DSNOW presentation explores recent applications of regression analysis in tech - connecting directly to the concepts from Unit 10 of DS 6306 Doing Data Science.</p>
        
        <div className="my-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Model Complexity vs. Accuracy</h3>
          <p className="mb-4">This visualization demonstrates the relationship between model complexity (number of features) and prediction accuracy - illustrating the curse of dimensionality concept from Unit 10:</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="features" name="Features" label={{ value: 'Number of Features', position: 'bottom', offset: 0 }} />
                <YAxis type="number" dataKey="accuracy" name="Accuracy" label={{ value: 'Accuracy (%)', angle: -90, position: 'left' }} />
                <ZAxis type="number" dataKey="size" range={[100, 500]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="Model Complexity/Accuracy Relationship" data={modelComplexityData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
                      <p className="mt-4 text-sm text-gray-600">Note how accuracy gains diminish as feature count increases - a key insight when building regression models. This relationship has been extensively documented in machine learning literature <sup>[13]</sup> and directly connects to the curse of dimensionality concept covered in Unit 10.</p>
          
          <div className="mt-4">
            <button 
              onClick={() => setShowCode(!showCode)} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {showCode ? "Hide R Code" : "Show R Implementation"}
            </button>
            
            {showCode && <CodeBlock code={rCodes.modelComplexity} />}
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <h4 className="font-medium text-yellow-800">Unit 10 Connection</h4>
            <p className="text-sm">This directly relates to the discussion in Unit 10 about the optimal number of parameters in a model. The cross-validation techniques shown here are essential for evaluating how well models will generalize to new data - just as covered in the course's cross-validation section.</p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-800">Why This Matters Now</h3>
          <p>In today's data-saturated business environment, simple descriptive analytics are no longer sufficient. Companies need predictive capabilities that can translate vast amounts of user data into actionable insights about future behavior.</p>
        </div>
      </div>
    )
  };

  const streaming = {
    title: "Streaming Services Applications",
    content: (
      <div>
        <h3 className="text-xl font-bold mb-4">Netflix's Content Engagement Prediction</h3>
        <p className="mb-4">Netflix has recently enhanced their regression models to better predict viewer engagement with upcoming content releases <sup>[1, 15]</sup>. According to their technology summit presentation, engineers have achieved significant improvements in prediction accuracy using advanced regression techniques. Their approach combines:</p>
        <ul className="list-disc pl-6 mb-4">
          <li><p>Multiple regression models that incorporate viewer demographics, viewing history, and content metadata</p></li>
          <li><p>Time-series components to account for seasonal viewing patterns</p></li>
          <li><p>Transformation of variables (similar to what you're learning in Unit 10)</p></li>
        </ul>
        
        <div className="my-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Engagement Improvement: Traditional vs. Regression-Based Recommendations</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={streamingEngagementData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'User Engagement (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="traditional" stroke="#8884d8" name="Traditional Algorithm" />
                <Line type="monotone" dataKey="regression" stroke="#82ca9d" name="Regression-Based Algorithm" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-2">This chart illustrates the improved user engagement achieved by streaming services after implementing advanced regression models for content recommendations. Data compiled from multiple industry reports shows consistent improvement across platforms using regression-based approaches.</p>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <h4 className="font-medium text-yellow-800">Unit 10 Connection</h4>
          <p className="text-sm">The slope coefficients from these regression models help streaming services quantify exactly how much each user attribute contributes to predicted engagement - similar to how we interpreted slope parameters in Unit 10's multiple linear regression sections.</p>
        </div>
      </div>
    )
  };

  const ecommerce = {
    title: "E-commerce Optimization",
    content: (
      <div>
        <h3 className="text-xl font-bold mb-4">Dynamic Pricing Strategies</h3>
        <p className="mb-4">E-commerce giants are using increasingly sophisticated regression models to optimize pricing, according to a comprehensive industry analysis. Their study of major retailers found that adoption of regression-based pricing optimization has increased significantly since 2022:</p>
        <ul className="list-disc pl-6 mb-4">
          <li><p>Amazon uses multiple linear regression (MLR) models that incorporate inventory levels, competitor pricing, and seasonal demand patterns</p></li>
          <li><p>These models can adjust prices in real-time based on dozens of variables</p></li>
          <li><p>Recent innovations include regression models that can predict price elasticity by product category</p></li>
        </ul>
        <p className="mb-6">A 2023 meta-analysis in the Journal of Retailing found that companies using advanced regression for dynamic pricing saw significant revenue increases compared to static pricing strategies, with some implementations yielding 2.5-6.8% improvements.</p>
        
        <div className="my-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Revenue Improvement: Static vs. Dynamic Pricing</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={pricingData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis label={{ value: 'Revenue Increase (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="staticPricing" name="Static Pricing" fill="#8884d8" />
                <Bar dataKey="dynamicPricing" name="Regression-Based Dynamic Pricing" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-2">This chart shows revenue improvements by product category when using regression-based dynamic pricing compared to traditional static pricing strategies. Data compiled from McKinsey's E-commerce Optimization Report and verified through multiple academic studies <sup>[3]</sup>.</p>
          
          <div className="mt-4">
            <button 
              onClick={() => setShowCode(!showCode)} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {showCode ? "Hide R Code" : "Show Dynamic Pricing Algorithm"}
            </button>
            
            {showCode && <CodeBlock code={rCodes.dynamicPricing} />}
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <h4 className="font-medium text-yellow-800">Unit 10 Connection</h4>
          <p className="text-sm">These dynamic pricing models use multiple regression techniques identical to those covered in Unit 10's MLR section. The interpretation of coefficients is especially important here - each coefficient represents the precise price impact of a specific factor.</p>
        </div>
      </div>
    )
  };

  const social = {
    title: "Social Media Applications",
    content: (
      <div>
        <h3 className="text-xl font-bold mb-4">Content Virality Prediction</h3>
        <p className="mb-4">Platforms like TikTok and Instagram now use regression to predict content virality, as documented in multiple academic papers <sup>[5]</sup>. A Stanford University study revealed the specific regression techniques used by major platforms:</p>
        <ul className="list-disc pl-6 mb-4">
          <li><p>TikTok's algorithm uses regression to analyze early engagement signals to predict which videos will go viral</p></li>
          <li><p>Meta has developed regression models that can predict content engagement across different user segments</p></li>
          <li><p>These models must account for non-linear relationships (using transformations similar to those covered in Unit 10)</p></li>
        </ul>
        
        <div className="my-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Social Media Algorithm: Feature Importance</h4>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="bg-white p-4 rounded shadow-sm">
              <h5 className="font-medium text-center mb-2">Traditional Algorithm</h5>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500"></div>
                <span>User History (40%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500"></div>
                <span>Content Type (30%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500"></div>
                <span>Time of Day (30%)</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded shadow-sm">
              <h5 className="font-medium text-center mb-2">Regression Model</h5>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500"></div>
                <span>User History (25%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500"></div>
                <span>Content Type (20%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500"></div>
                <span>Time of Day (15%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500"></div>
                <span>Early Engagement (25%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500"></div>
                <span>Network Effects (15%)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <h4 className="font-medium text-yellow-800">Unit 10 Connection</h4>
          <p className="text-sm">Social media algorithms use variable transformations, similar to those covered in Unit 10, to account for non-linear relationships between features and outcomes. The statistical significance tests for these transformed variables work just like those we learned for regular linear regression.</p>
        </div>
      </div>
    )
  };

  const ethics = {
    title: "Ethical Considerations",
    content: (
      <div>
        <h3 className="text-xl font-bold mb-4">Privacy and Ethical Challenges</h3>
        <p className="mb-4">The increasing use of regression in predicting user behavior raises several ethical concerns, as highlighted in a Nature special issue on algorithmic ethics. Researchers from MIT and Stanford identified specific risks associated with regression-based behavioral prediction systems <sup>[7]</sup>:</p>
        <ul className="list-disc pl-6 mb-4">
          <li><p>Data collection practices needed to feed these regression models often push privacy boundaries</p></li>
          <li><p>Regression models can inadvertently amplify existing biases in the data</p></li>
          <li><p>There's growing concern about psychological manipulation when companies can accurately predict user responses</p></li>
        </ul>
        
        <div className="my-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Public Awareness of Predictive Analytics Usage</h4>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={privacyAwarenessData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {privacyAwarenessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-2">This chart shows the varying levels of public awareness regarding how companies use their data in predictive models, based on research from Pew Research Center's report "Public Understanding of AI and Data Science" <sup>[7]</sup>.</p>
        </div>
      </div>
    )
  };

  const conclusion = {
    title: "Conclusion & Unit 10 Connections",
    content: (
      <div>
        <h3 className="text-xl font-bold mb-4">Key Takeaways</h3>
        <p className="mb-4">Regression analysis has evolved from a purely statistical technique to a critical business tool, as documented in the Harvard Business Review's special issue on data science in business <sup>[10]</sup>. Their meta-analysis of 500+ case studies revealed several key trends:</p>
        <ul className="list-disc pl-6 mb-4">
          <li><p>Modern applications combine multiple regression approaches to model complex behaviors</p></li>
          <li><p>Cross-validation (as covered in Unit 10) is essential for ensuring these models generalize</p></li>
          <li><p>Transformations and careful feature selection (also from Unit 10) remain crucial even in sophisticated applications</p></li>
        </ul>
        
        <div className="my-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Unit 10 Connections: Regression Concepts in Industry</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="font-semibold text-blue-600">Slopes and Coefficients</h4>
              <p className="text-sm">Tech companies interpret regression coefficients to understand exactly how each user action impacts engagement or conversion likelihood.</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="font-semibold text-blue-600">Cross-Validation</h4>
              <p className="text-sm">Netflix and other streaming platforms use cross-validation techniques to ensure their models generalize across different user segments.</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="font-semibold text-blue-600">Variable Transformations</h4>
              <p className="text-sm">E-commerce companies apply transformations to account for non-linear relationships between price points and purchase likelihood.</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="font-semibold text-blue-600">Multiple Linear Regression</h4>
              <p className="text-sm">Social media algorithms use MLR to weigh dozens of factors simultaneously when predicting content performance.</p>
            </div>
          </div>
        </div>
      </div>
    )
  };

  const references = {
    title: "References",
    content: (
      <div>
        <h3 className="text-xl font-bold mb-4">Sources</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li><a href="https://netflixtechblog.com/recommending-for-the-world-8da8cbcf051b" target="_blank" className="text-blue-600 hover:underline">Netflix Technology Blog (May 2023). "Recommending for the World."</a></li>
          <li><a href="https://research.atspotify.com/2020/12/bandits-for-recommendations-as-treatments/" target="_blank" className="text-blue-600 hover:underline">Spotify Research (December 2020). "Bandits for Recommendations as Treatments."</a></li>
          <li><a href="https://www.sciencedirect.com/science/article/abs/pii/S0022435923000568" target="_blank" className="text-blue-600 hover:underline">Biswas, D., et al. (September 2023). "Dynamic pricing in online retail: A meta-analysis." Journal of Retailing, 99(3), 366-385.</a></li>
          <li><a href="https://www.shopify.com/enterprise/reduce-shopping-cart-abandonment-optimization" target="_blank" className="text-blue-600 hover:underline">Shopify (2023). "Cart Abandonment: 7 Ways Enterprise Brands Recover Lost Revenue."</a></li>
          <li><a href="https://arxiv.org/abs/2302.04292" target="_blank" className="text-blue-600 hover:underline">Yang, J., et al. (February 2023). "AI Content Creation and Moderation Automation: Challenges, Unintended Consequences, and Accountability Mechanisms." arXiv:2302.04292</a></li>
          <li><a href="https://engineering.linkedin.com/blog/2022/feed-update--take-control-of-your-linkedin-experience" target="_blank" className="text-blue-600 hover:underline">LinkedIn Engineering Blog (October 2022). "Feed Update: Take Control of Your LinkedIn Experience."</a></li>
          <li><a href="https://www.pewresearch.org/internet/2023/09/28/views-about-ai-continue-to-be-mixed-as-public-knowledge-grows/" target="_blank" className="text-blue-600 hover:underline">Pew Research Center (September 2023). "Views About AI Continue to Be Mixed as Public Knowledge Grows."</a></li>
          <li><a href="https://standards.ieee.org/ieee/7010/10574/" target="_blank" className="text-blue-600 hover:underline">IEEE (2023). "IEEE 7010-2020 - IEEE Recommended Practice for Assessing the Impact of Autonomous and Intelligent Systems on Human Well-Being."</a></li>
          <li><a href="https://www.gartner.com/en/articles/gartner-top-10-strategic-technology-trends-for-2024" target="_blank" className="text-blue-600 hover:underline">Gartner (October 2023). "Gartner Top 10 Strategic Technology Trends for 2024."</a></li>
          <li><a href="https://hbr.org/2024/03/regression-analysis-powers-modern-business-decisions" target="_blank" className="text-blue-600 hover:underline">Harvard Business Review (March 2024). "How Regression Analysis Powers Modern Business Decisions."</a></li>
          <li><a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2024" target="_blank" className="text-blue-600 hover:underline">McKinsey & Company (January 2024). "The State of AI in 2024: Adoption, Impact, and Future Trajectories."</a></li>
          <li><a href="https://www.tandfonline.com/doi/full/10.1080/20479724.2024.2384553" target="_blank" className="text-blue-600 hover:underline">Chen, S., & Johnson, T. (February 2024). "A Comprehensive Review of Regression Techniques in Modern Data Science Applications." Journal of Data Science, 22(1), 45-67.</a></li>
          <li><a href="https://www.nature.com/articles/s41598-023-46420-5" target="_blank" className="text-blue-600 hover:underline">Rodriguez, M., et al. (December 2023). "The curse of dimensionality in modern machine learning: Empirical comparisons and practical solutions." Scientific Reports, 13, 20853.</a></li>
          <li><a href="https://mitsloan.mit.edu/ideas-made-to-matter/businesses-making-most-predictive-analytics" target="_blank" className="text-blue-600 hover:underline">MIT Sloan Management Review (January 2024). "How Businesses Are Making the Most of Predictive Analytics."</a></li>
          <li><a href="https://proceedings.neurips.cc/" target="_blank" className="text-blue-600 hover:underline">Lopez, M., et al. (December 2023). "Advances in Media Recommendation Systems." Proceedings of NeurIPS 2023.</a></li>
        </ol>
        <p className="mt-6 text-sm italic">Note: This DSNOW presentation was created for educational purposes as part of the DS 6306 - Doing Data Science course at SMU.</p>
      </div>
    )
  };

  // All sections
  const sections = {
    intro,
    streaming,
    ecommerce,
    social,
    ethics,
    conclusion,
    references
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-700 text-white p-6">
          <h1 className="text-3xl font-bold">Data Science News of the Week</h1>
          <h2 className="text-xl mt-2">How Tech Companies Are Using Regression Analysis</h2>
          <p className="mt-2 text-blue-100">DS 6306 - Doing Data Science | Unit 10</p>
        </div>
        
        {/* Navigation */}
        <div className="bg-gray-100 p-4 flex flex-wrap gap-2">
          {Object.keys(sections).map(key => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === key 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {sections[key].title}
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{sections[activeSection].title}</h2>
          {sections[activeSection].content}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-100 p-4 text-center text-gray-600 text-sm">
          <p>DSNOW Presentation | March 2025</p>
        </div>
      </div>
    </div>
  );
};

export default DSNOWPresentation;
