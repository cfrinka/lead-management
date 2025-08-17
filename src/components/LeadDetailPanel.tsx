import { useState } from 'react';
import { X } from 'lucide-react';
import type { Lead, Opportunity } from '../types';
import Button from './atoms/Button';
import Input from './atoms/Input';
import Select from './atoms/Select';
import StatusBadge from './molecules/StatusBadge';

interface LeadDetailPanelProps {
  lead: Lead;
  onClose: () => void;
  onUpdate: (lead: Lead) => void;
  onConvertToOpportunity: (lead: Lead, opportunityData: Partial<Opportunity>) => void;
}

const LeadDetailPanel = ({ lead, onClose, onUpdate, onConvertToOpportunity }: LeadDetailPanelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(lead);
  const [isConverting, setIsConverting] = useState(false);
  const [opportunityData, setOpportunityData] = useState({
    name: `${lead.company} - ${lead.name}`,
    stage: 'Prospecting',
    amount: '',
    accountName: lead.company
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSaving, setIsSaving] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!editedLead.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(editedLead.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    setErrors({});

    setTimeout(() => {
      try {
        onUpdate(editedLead);
        setIsEditing(false);
        setIsSaving(false);
      } catch (error) {
        setErrors({ general: 'Failed to save changes. Please try again.' });
        setIsSaving(false);
      }
    }, 500);
  };

  const handleCancel = () => {
    setEditedLead(lead);
    setIsEditing(false);
    setErrors({});
  };

  const handleConvert = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!opportunityData.name.trim()) {
      newErrors.name = 'Opportunity name is required';
    }
    if (!opportunityData.accountName.trim()) {
      newErrors.accountName = 'Account name is required';
    }
    if (opportunityData.amount && isNaN(Number(opportunityData.amount))) {
      newErrors.amount = 'Amount must be a valid number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    setErrors({});

    setTimeout(() => {
      try {
        onConvertToOpportunity(lead, {
          ...opportunityData,
          amount: opportunityData.amount ? Number(opportunityData.amount) : undefined
        });
        setIsSaving(false);
      } catch (error) {
        setErrors({ general: 'Failed to convert lead. Please try again.' });
        setIsSaving(false);
      }
    }, 500);
  };


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
          <div className="flex h-full flex-col max-h-[90vh]">
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Lead Details</h2>
              <button
                onClick={onClose}
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {errors.general && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-800">{errors.general}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">{lead.name}</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <p className="mt-1 text-sm text-gray-900">{lead.company}</p>
                  </div>

                  <div>
                    {isEditing ? (
                      <>
                        <Input
                          type="email"
                          label="Email"
                          value={editedLead.email}
                          onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </>
                    ) : (
                      <>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-sm text-gray-900">{lead.email}</p>
                      </>
                    )}
                  </div>

                  <div>
                    {isEditing ? (
                      <Select
                        label="Status"
                        value={editedLead.status}
                        onChange={(e) => setEditedLead({ ...editedLead, status: e.target.value as Lead['status'] })}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="unqualified">Unqualified</option>
                      </Select>
                    ) : (
                      <>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <div className="mt-1">
                          <StatusBadge status={lead.status} />
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Source</label>
                    <p className="mt-1 text-sm text-gray-900">{lead.source}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Score</label>
                    <p className="mt-1 text-sm text-gray-900 font-semibold">{lead.score}</p>
                  </div>
                </div>
              </div>

              {!isConverting && !isEditing && (
                <div className="border-t pt-6">
                  <Button
                    onClick={() => setIsConverting(true)}
                    variant="primary"
                    className="w-full"
                  >
                    Convert to Opportunity
                  </Button>
                </div>
              )}

              {isConverting && (
                <div className="border-t pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Create Opportunity</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Input
                        label="Opportunity Name"
                        value={opportunityData.name}
                        onChange={(e) => setOpportunityData({ ...opportunityData, name: e.target.value })}
                        error={errors.name}
                      />
                    </div>

                    <div>
                      <Select
                        label="Stage"
                        value={opportunityData.stage}
                        onChange={(e) => setOpportunityData({ ...opportunityData, stage: e.target.value })}
                      >
                        <option value="Prospecting">Prospecting</option>
                        <option value="Qualification">Qualification</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Closed Won">Closed Won</option>
                        <option value="Closed Lost">Closed Lost</option>
                      </Select>
                    </div>

                    <div>
                      <Input
                        type="number"
                        label="Amount (Optional)"
                        value={opportunityData.amount}
                        onChange={(e) => setOpportunityData({ ...opportunityData, amount: e.target.value })}
                        error={errors.amount}
                      />
                    </div>

                    <div>
                      <Input
                        label="Account Name"
                        value={opportunityData.accountName}
                        onChange={(e) => setOpportunityData({ ...opportunityData, accountName: e.target.value })}
                        error={errors.accountName}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t bg-gray-50 px-6 py-4">
            <div className="flex justify-end space-x-3">
              {isEditing ? (
                <>
                  <Button
                    variant="danger"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    isLoading={isSaving}
                  >
                    Save
                  </Button>
                </>
              ) : isConverting ? (
                <>
                  <Button
                    variant="danger"
                    onClick={() => setIsConverting(false)}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConvert}
                    disabled={isSaving}
                    isLoading={isSaving}
                  >
                    Create Opportunity
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPanel;
