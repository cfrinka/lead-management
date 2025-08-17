import { useState, useEffect } from "react";
import type { Lead, Opportunity, FilterState, PaginationState } from "./types";
import LeadsList from "./components/LeadsList";
import LeadDetailPanel from "./components/LeadDetailPanel";
import OpportunitiesTable from "./components/OpportunitiesTable";
import { useLocalStorage } from "./hooks/useLocalStorage";
import leadsData from "./data/leads.json";

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useLocalStorage<FilterState>('seller-console-filters', {
    search: '',
    status: '',
    sortField: 'score',
    sortDirection: 'desc'
  });
  const [pagination, setPagination] = useLocalStorage<PaginationState>('seller-console-pagination', {
    currentPage: 1,
    itemsPerPage: 20
  });

  useEffect(() => {
    const loadLeads = () => {
      setTimeout(() => {
        try {
          setLeads(leadsData as Lead[]);
          setIsLoading(false);
        } catch (err) {
          setError('Failed to load leads');
          setIsLoading(false);
        }
      }, 800);
    };

    loadLeads();
  }, []);

  const updateLead = (updatedLead: Lead) => {
    setLeads(prev => prev.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    ));
    setSelectedLead(updatedLead);
  };

  const convertToOpportunity = (lead: Lead, opportunityData: Partial<Opportunity>) => {
    const newOpportunity: Opportunity = {
      id: `opp-${Date.now()}`,
      name: opportunityData.name || `${lead.company} - ${lead.name}`,
      stage: opportunityData.stage || 'Prospecting',
      amount: opportunityData.amount,
      accountName: opportunityData.accountName || lead.company,
      createdFrom: lead.id
    };

    setOpportunities(prev => [...prev, newOpportunity]);
    
    const updatedLead = { ...lead, status: 'qualified' as const };
    updateLead(updatedLead);
    
    setSelectedLead(null);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="w-full px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mini Seller Console</h1>
          <p className="mt-2 text-gray-600">Manage your leads and convert them to opportunities</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
          <div className="w-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Leads</h2>
            <LeadsList
              leads={leads}
              filters={filters}
              onFiltersChange={setFilters}
              pagination={pagination}
              onPaginationChange={setPagination}
              onLeadSelect={setSelectedLead}
              isLoading={isLoading}
              error={error}
            />
          </div>

          <div className="w-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Opportunities</h2>
            <OpportunitiesTable opportunities={opportunities} />
          </div>
        </div>

        {selectedLead && (
          <LeadDetailPanel
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onUpdate={updateLead}
            onConvertToOpportunity={convertToOpportunity}
          />
        )}
      </div>
    </div>
  );
}

export default App;
