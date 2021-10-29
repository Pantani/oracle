package consuming_test

import (
	"testing"

	keepertest "github.com/cosmonaut/oracle/testutil/keeper"
	"github.com/cosmonaut/oracle/testutil/nullify"
	"github.com/cosmonaut/oracle/x/consuming"
	"github.com/cosmonaut/oracle/x/consuming/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		PortId: types.PortID,
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ConsumingKeeper(t)
	consuming.InitGenesis(ctx, *k, genesisState)
	got := consuming.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.Equal(t, genesisState.PortId, got.PortId)

	// this line is used by starport scaffolding # genesis/test/assert
}
