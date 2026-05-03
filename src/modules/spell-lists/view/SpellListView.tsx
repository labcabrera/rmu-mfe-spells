import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  AddButton,
  CategorySeparator,
  DeleteButton,
  deleteSpellList,
  EditableAvatar,
  EditButton,
  fetchSpellList,
  fetchSpells,
  LayoutBase,
  RefreshButton,
  Spell,
  SpellList,
  TechnicalInfo,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { getAvatarImages } from '../../services/image-service';
import SpellTable from '../../spells/shared/SpellTable';
import SpellListViewInfo from './SpellListViewInfo';

const SpellListView: FC = () => {
  const auth = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { spellListId } = useParams<{ spellListId?: string }>();
  const { showError } = useError();
  const [spellList, setSpellList] = useState<SpellList | null>(null);
  const [spells, setSpells] = useState<Spell[]>([]);

  const bindSpellList = (spellListId: string) => {
    fetchSpellList(spellListId, auth)
      .then((response) => setSpellList(response))
      .catch((err: Error) => showError(err.message));
  };

  const bindSpells = (spellListId: string) => {
    fetchSpells(`spellListId==${spellListId}`, 0, 100, auth)
      .then((response) => setSpells(response.content))
      .catch((err: Error) => showError(err.message));
  };

  const onAddSpell = () => {
    navigate(`/spells/spells/create?spellListId=${spellList?.id}`, { state: { spellList } });
  };

  const onDelete = () => {
    deleteSpellList(spellList!.id, auth).then(() => navigate('/spells/spell-lists'));
  };

  useEffect(() => {
    if (spellList) {
      bindSpells(spellList.id);
    }
  }, [spellList]);

  useEffect(() => {
    if (location.state && location.state.spellList) {
      setSpellList(location.state.spellList);
    } else if (spellListId) {
      bindSpellList(spellListId);
    }
  }, [location.state, spellListId, showError]);

  if (!spellList) return <p>Loading...</p>;

  return (
      <LayoutBase
        breadcrumbs={[
          { name: t('home'), link: '/' },
          { name: t('spell-lists'), link: '/spells/spell-lists' },
          { name: t('view') },
        ]}
        actions={[
          <RefreshButton
            onClick={() => {
              bindSpellList(spellList.id);
            }}
          />,
          <EditButton onClick={() => navigate(`/spells/spell-lists/edit/${spellList.id}`, { state: spellList })} />,
          <DeleteButton onClick={() => alert('todo')} />,
        ]}
        leftPanel={
          <EditableAvatar
            imageUrl={spellList.imageUrl || ''}
            images={getAvatarImages()}
            onImageChange={function (newImageUrl: string): void {
              throw new Error('Function not implemented.');
            }}
          />
        }
      >
        <SpellListViewInfo spellList={spellList} />
        <CategorySeparator text={t('spells')}>
          <AddButton onClick={onAddSpell} />
        </CategorySeparator>
        <SpellTable spells={spells} />
        <TechnicalInfo>
          <pre>{JSON.stringify(spellList, null, 2)}</pre>
        </TechnicalInfo>
      </LayoutBase>
  );
};

export default SpellListView;
